import { useState, useMemo } from "react";
import { furnitureCatalog, FURNITURE_CATEGORIES } from "../../furniture/catalog";
import { useThemeConfig, DomIcon } from "../../theme";

interface FurnitureBrowserProps {
  isDark: boolean;
}

export function FurnitureBrowser({ isDark }: FurnitureBrowserProps) {
  const [search, setSearch] = useState("");
  const { resolveEntityIcon } = useThemeConfig();

  const filteredByCategory = useMemo(() => {
    const q = search.toLowerCase();
    const filtered = q
      ? furnitureCatalog.filter(
          (e) => e.label.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)
        )
      : furnitureCatalog;

    const grouped: Record<string, typeof furnitureCatalog> = {};
    for (const entry of filtered) {
      if (!grouped[entry.category]) grouped[entry.category] = [];
      grouped[entry.category].push(entry);
    }
    return grouped;
  }, [search]);

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("application/furniture-type", type);
    e.dataTransfer.effectAllowed = "copy";
  };

  const inputStyle = {
    backgroundColor: isDark ? "#333" : "#fff",
    borderColor: isDark ? "#555" : "#d1d5db",
    color: "var(--fp-text)",
  };

  return (
    <div className="p-4 space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide">
        Furniture
      </h3>
      <p className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
        Drag furniture onto the floor plan.
      </p>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search furniture..."
        className="w-full px-3 py-2 rounded border text-sm focus:outline-none focus:border-blue-500"
        style={inputStyle}
      />

      <div className="space-y-3">
        {FURNITURE_CATEGORIES.filter((cat) => filteredByCategory[cat]?.length).map(
          (category) => (
            <div key={category}>
              <h4
                className="text-xs font-semibold uppercase mb-1 sticky top-0 py-1"
                style={{
                  color: "var(--fp-text-secondary)",
                  backgroundColor: "var(--fp-card)",
                }}
              >
                {category} ({filteredByCategory[category].length})
              </h4>
              <div className="space-y-0.5">
                {filteredByCategory[category].map((entry) => {
                  const { icon } = resolveEntityIcon("furniture", "on", entry.type);
                  return (
                    <div
                      key={entry.type}
                      draggable
                      onDragStart={(e) => handleDragStart(e, entry.type)}
                      className="w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 cursor-grab active:cursor-grabbing select-none"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--fp-text)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "var(--fp-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <DomIcon icon={icon} size={20} />
                      <span className="truncate">{entry.label}</span>
                      <span
                        className="text-xs ml-auto flex-shrink-0"
                        style={{ color: "var(--fp-text-secondary)" }}
                      >
                        {entry.defaultGridW}&times;{entry.defaultGridH}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
