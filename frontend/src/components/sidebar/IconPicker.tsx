import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { SerializedIconRef } from "../../types";
import type { IconData } from "../../theme/types";
import { iconPacks, DomIcon, BRAND, useThemeConfig } from "../../theme";

export interface IconCandidate {
  packId: string;
  packName: string;
  domain: string;
  deviceClass?: string;
  icon: IconData;
  keywords: string;
}

function buildIconIndex(): IconCandidate[] {
  const candidates: IconCandidate[] = [];
  const seen = new Set<string>();

  for (const pack of Object.values(iconPacks)) {
    const fbKey = `${pack.id}::__fallback__`;
    if (!seen.has(fbKey)) {
      seen.add(fbKey);
      candidates.push({
        packId: pack.id,
        packName: pack.name,
        domain: "__fallback__",
        icon: pack.fallback.icon,
        keywords: `${pack.name} ${pack.id} fallback`.toLowerCase(),
      });
    }

    for (const [domain, domainConfig] of Object.entries(pack.domains)) {
      const dKey = `${pack.id}::${domain}`;
      if (!seen.has(dKey)) {
        seen.add(dKey);
        candidates.push({
          packId: pack.id,
          packName: pack.name,
          domain,
          icon: domainConfig.default.icon,
          keywords: `${pack.name} ${pack.id} ${domain.replace(/_/g, " ")}`.toLowerCase(),
        });
      }

      if (domainConfig.states) {
        for (const [state, entry] of Object.entries(domainConfig.states)) {
          const sKey = `${pack.id}::${domain}::state::${state}`;
          if (seen.has(sKey)) continue;
          if (JSON.stringify(entry.icon) === JSON.stringify(domainConfig.default.icon)) continue;
          seen.add(sKey);
          candidates.push({
            packId: pack.id,
            packName: pack.name,
            domain,
            icon: entry.icon,
            keywords: `${pack.name} ${pack.id} ${domain.replace(/_/g, " ")} ${state}`.toLowerCase(),
          });
        }
      }

      if (domainConfig.deviceClasses) {
        for (const [dc, dcConfig] of Object.entries(domainConfig.deviceClasses)) {
          const dcKey = `${pack.id}::${domain}::${dc}`;
          if (seen.has(dcKey)) continue;
          seen.add(dcKey);
          candidates.push({
            packId: pack.id,
            packName: pack.name,
            domain,
            deviceClass: dc,
            icon: dcConfig.default.icon,
            keywords: `${pack.name} ${pack.id} ${domain.replace(/_/g, " ")} ${dc.replace(/_/g, " ")}`.toLowerCase(),
          });

          if (dcConfig.states) {
            for (const [state, entry] of Object.entries(dcConfig.states)) {
              const dsKey = `${pack.id}::${domain}::${dc}::${state}`;
              if (seen.has(dsKey)) continue;
              if (JSON.stringify(entry.icon) === JSON.stringify(dcConfig.default.icon)) continue;
              seen.add(dsKey);
              candidates.push({
                packId: pack.id,
                packName: pack.name,
                domain,
                deviceClass: dc,
                icon: entry.icon,
                keywords: `${pack.name} ${pack.id} ${domain.replace(/_/g, " ")} ${dc.replace(/_/g, " ")} ${state}`.toLowerCase(),
              });
            }
          }
        }
      }
    }
  }

  return candidates;
}

let _iconIndex: IconCandidate[] | null = null;
export function getIconIndex(): IconCandidate[] {
  if (!_iconIndex) _iconIndex = buildIconIndex();
  return _iconIndex;
}

export function IconPicker({
  label,
  isDark,
  onSelect,
  onClose,
}: {
  label: string;
  isDark: boolean;
  onSelect: (ref: SerializedIconRef) => void;
  onClose: () => void;
}) {
  const { getDomainColor } = useThemeConfig();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const allIcons = useMemo(() => getIconIndex(), []);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allIcons;
    const terms = q.split(/\s+/);
    return allIcons.filter((c) => terms.every((t) => c.keywords.includes(t)));
  }, [query, allIcons]);

  const grouped = useMemo(() => {
    const map = new Map<string, IconCandidate[]>();
    for (const c of filtered) {
      const list = map.get(c.packId) ?? [];
      list.push(c);
      map.set(c.packId, list);
    }
    return map;
  }, [filtered]);

  const handleSelect = useCallback(
    (c: IconCandidate) => {
      const ref: SerializedIconRef = {
        pack_id: c.packId,
        domain: c.domain,
        device_class: c.deviceClass,
      };
      onSelect(ref);
      onClose();
    },
    [onSelect, onClose],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        backgroundColor: isDark ? "#1e1e1e" : "#fff",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: `1px solid ${isDark ? "#333" : "#e0e0e0"}`, flexShrink: 0 }}
      >
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
            color: "var(--fp-text)",
            padding: "2px 4px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
        </button>
        <span className="text-sm font-medium flex-1">Icon for {label}</span>
      </div>

      {/* Search */}
      <div className="px-3 py-2" style={{ flexShrink: 0 }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons... (e.g. light, mdi, temperature)"
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={{
            backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0",
            color: "var(--fp-text)",
            border: `1px solid ${isDark ? "#444" : "#ddd"}`,
          }}
        />
        <div className="text-xs mt-1" style={{ color: "var(--fp-text-secondary)" }}>
          {filtered.length} icons found
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-3 pb-3" style={{ scrollbarWidth: "thin" }}>
        {Array.from(grouped.entries()).map(([packId, icons]) => (
          <div key={packId} className="mb-3">
            <div
              className="text-xs font-semibold mb-1.5 sticky top-0 py-1 px-1"
              style={{
                color: "var(--fp-text-secondary)",
                backgroundColor: isDark ? "#1e1e1e" : "#fff",
              }}
            >
              {iconPacks[packId]?.name ?? packId}
            </div>
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))" }}
            >
              {icons.map((c, i) => {
                const tooltip = [c.domain, c.deviceClass].filter(Boolean).join(" / ");
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(c)}
                    title={tooltip}
                    className="flex items-center justify-center rounded-lg transition-colors"
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
                      border: "1.5px solid transparent",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = BRAND;
                      (e.currentTarget as HTMLElement).style.backgroundColor = isDark ? "#333" : "#e8e8e8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      (e.currentTarget as HTMLElement).style.backgroundColor = isDark ? "#2a2a2a" : "#f5f5f5";
                    }}
                  >
                    <DomIcon icon={c.icon} size={22} fill={c.domain !== "__fallback__" ? getDomainColor(c.domain) : undefined} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-sm" style={{ color: "var(--fp-text-secondary)" }}>
            No icons match "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
