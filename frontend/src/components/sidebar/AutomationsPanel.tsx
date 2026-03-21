import { useState, useMemo, useEffect, useRef } from "react";
import type { HomeAssistant, HassEntity, HaEntityRegistryEntry, HaCategory } from "../../types";
import { useThemeConfig, BRAND } from "../../theme";

interface AutomationsPanelProps {
  hass: HomeAssistant;
  isDark: boolean;
  entityRegistry: HaEntityRegistryEntry[];
  automationCategories: HaCategory[];
}

// Regex to find input_* entity_ids in automation config JSON
const HELPER_ENTITY_RE = /\b(input_(?:number|boolean|datetime|text|select)\.[a-z0-9_]+)\b/g;

function getDomain(entityId: string): string {
  return entityId.split(".")[0];
}

function getFriendlyName(entity: HassEntity | undefined, entityId: string): string {
  return (entity?.attributes?.friendly_name as string) ?? entityId.split(".")[1];
}

const HELPER_DOMAINS = ["input_number", "input_boolean", "input_datetime", "input_text", "input_select"];

interface CategoryGroup {
  category: HaCategory | null; // null = uncategorized
  automations: string[];       // entity_ids
}

/* ─── Helper inline controls ─── */

function HelperControl({
  entityId,
  entity,
  hass,
  isDark,
}: {
  entityId: string;
  entity: HassEntity | undefined;
  hass: HomeAssistant;
  isDark: boolean;
}) {
  const domain = getDomain(entityId);
  const name = getFriendlyName(entity, entityId);
  const state = entity?.state ?? "unknown";
  const attrs = entity?.attributes ?? {};

  const rowBg = isDark ? "#333" : "#f0f0f0";

  if (domain === "input_boolean") {
    const isOn = state === "on";
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded" style={{ backgroundColor: rowBg }}>
        <span className="text-[11px] flex-1 truncate">{name}</span>
        <button
          onClick={() => hass.callService("input_boolean", "toggle", {}, { entity_id: entityId })}
          className="px-2 py-0.5 rounded text-[10px] font-medium"
          style={{
            backgroundColor: isOn ? BRAND : isDark ? "#444" : "#ddd",
            color: isOn ? "#fff" : "var(--fp-text-secondary)",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isOn ? "On" : "Off"}
        </button>
      </div>
    );
  }

  if (domain === "input_number") {
    const value = parseFloat(state) || 0;
    const min = (attrs.min as number) ?? 0;
    const max = (attrs.max as number) ?? 100;
    const step = (attrs.step as number) ?? 1;
    const unit = attrs.unit_of_measurement as string | undefined;
    return (
      <div className="px-2 py-1.5 rounded space-y-1" style={{ backgroundColor: rowBg }}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] flex-1 truncate">{name}</span>
          <span className="text-[10px] font-medium tabular-nums">
            {value}{unit ? ` ${unit}` : ""}
          </span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) =>
            hass.callService("input_number", "set_value", { value: Number(e.target.value) }, { entity_id: entityId })
          }
          className="w-full"
          style={{ accentColor: BRAND, height: 4 }}
        />
      </div>
    );
  }

  if (domain === "input_datetime") {
    const hasDate = attrs.has_date as boolean;
    const hasTime = attrs.has_time as boolean;
    const inputType = hasDate && hasTime ? "datetime-local" : hasDate ? "date" : "time";
    // Build current value for the input
    let inputValue = "";
    if (hasTime && !hasDate) {
      // state is "HH:MM:SS" for time-only
      inputValue = state.substring(0, 5); // "HH:MM"
    } else if (hasDate && !hasTime) {
      inputValue = state; // "YYYY-MM-DD"
    } else {
      // datetime: state is "YYYY-MM-DD HH:MM:SS"
      inputValue = state.replace(" ", "T").substring(0, 16);
    }
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded" style={{ backgroundColor: rowBg }}>
        <span className="text-[11px] flex-1 truncate">{name}</span>
        <input
          type={inputType}
          value={inputValue}
          onChange={(e) => {
            const val = e.target.value;
            const data: Record<string, string> = {};
            if (hasTime && !hasDate) data.time = val + ":00";
            else if (hasDate && !hasTime) data.date = val;
            else {
              const [d, t] = val.split("T");
              data.date = d;
              data.time = t + ":00";
            }
            hass.callService("input_datetime", "set_datetime", data, { entity_id: entityId });
          }}
          className="text-[11px] px-1.5 py-1 rounded border"
          style={{
            backgroundColor: isDark ? "#2a2a2a" : "#fff",
            borderColor: isDark ? "#555" : "#ccc",
            color: "var(--fp-text)",
            outline: "none",
          }}
        />
      </div>
    );
  }

  if (domain === "input_text") {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded" style={{ backgroundColor: rowBg }}>
        <span className="text-[11px] flex-shrink-0 truncate" style={{ maxWidth: "40%" }}>{name}</span>
        <input
          type="text"
          value={state}
          onChange={(e) =>
            hass.callService("input_text", "set_value", { value: e.target.value }, { entity_id: entityId })
          }
          className="flex-1 text-[11px] px-1.5 py-1 rounded border min-w-0"
          style={{
            backgroundColor: isDark ? "#2a2a2a" : "#fff",
            borderColor: isDark ? "#555" : "#ccc",
            color: "var(--fp-text)",
            outline: "none",
          }}
        />
      </div>
    );
  }

  if (domain === "input_select") {
    const options = (attrs.options as string[]) ?? [];
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded" style={{ backgroundColor: rowBg }}>
        <span className="text-[11px] flex-1 truncate">{name}</span>
        <select
          value={state}
          onChange={(e) =>
            hass.callService("input_select", "select_option", { option: e.target.value }, { entity_id: entityId })
          }
          className="text-[11px] px-1.5 py-1 rounded border"
          style={{
            backgroundColor: isDark ? "#2a2a2a" : "#fff",
            borderColor: isDark ? "#555" : "#ccc",
            color: "var(--fp-text)",
            outline: "none",
          }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  return null;
}

/* ─── Automation card ─── */

function AutomationCard({
  entityId,
  entity,
  hass,
  isDark,
  helpers,
}: {
  entityId: string;
  entity: HassEntity | undefined;
  hass: HomeAssistant;
  isDark: boolean;
  helpers: string[];
}) {
  const { getDomainColor } = useThemeConfig();
  const name = getFriendlyName(entity, entityId);
  const isEnabled = entity?.state === "on";
  const lastTriggered = entity?.attributes?.last_triggered as string | undefined;
  const domainColor = getDomainColor("automation");

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        backgroundColor: isDark ? "#2a2a2a" : "#f5f5f5",
        border: `1px solid ${isDark ? "#3a3a3a" : "#e0e0e0"}`,
      }}
    >
      {/* Automation header */}
      <div className="flex items-center gap-2 px-2.5 py-2">
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: isEnabled ? domainColor : isDark ? "#555" : "#bbb" }}
        />
        <span className="text-xs font-medium truncate flex-1">{name}</span>

        {/* Trigger button */}
        <button
          onClick={() => hass.callService("automation", "trigger", {}, { entity_id: entityId })}
          title="Trigger"
          className="px-2 py-0.5 rounded text-[10px] font-medium"
          style={{
            backgroundColor: isDark ? "#3a3a3a" : "#e4e4e4",
            color: "var(--fp-text-secondary)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ display: "inline-block", verticalAlign: "middle" }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        {/* Enable/disable toggle */}
        <button
          onClick={() =>
            hass.callService("automation", isEnabled ? "turn_off" : "turn_on", {}, { entity_id: entityId })
          }
          className="px-2 py-0.5 rounded text-[10px] font-medium"
          style={{
            backgroundColor: isEnabled ? BRAND : isDark ? "#444" : "#ddd",
            color: isEnabled ? "#fff" : "var(--fp-text-secondary)",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isEnabled ? "Enabled" : "Disabled"}
        </button>
      </div>

      {/* Last triggered */}
      {lastTriggered && lastTriggered !== "None" && (
        <div className="px-2.5 pb-1">
          <span className="text-[9px]" style={{ color: "var(--fp-text-secondary)" }}>
            Last: {new Date(lastTriggered).toLocaleString()}
          </span>
        </div>
      )}

      {/* Helpers */}
      {helpers.length > 0 && (
        <div
          className="px-2 pb-2 space-y-1"
          style={{ borderTop: `1px solid ${isDark ? "#333" : "#eaeaea"}` }}
        >
          <div style={{ height: 4 }} />
          {helpers.map((helperId) => (
            <HelperControl
              key={helperId}
              entityId={helperId}
              entity={hass.states[helperId]}
              hass={hass}
              isDark={isDark}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main panel ─── */

export function AutomationsPanel({
  hass,
  isDark,
  entityRegistry,
  automationCategories,
}: AutomationsPanelProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["__all__"]));
  const [search, setSearch] = useState("");
  // Per-automation helpers discovered via search/related
  const [automationHelpers, setAutomationHelpers] = useState<Record<string, string[]>>({});
  const [helpersLoaded, setHelpersLoaded] = useState(false);

  // Find all automation entity_ids
  const automationEntityIds = useMemo(() =>
    entityRegistry
      .filter((e) => getDomain(e.entity_id) === "automation")
      .map((e) => e.entity_id),
    [entityRegistry],
  );

  // Stable ref to hass.callWS to avoid re-running effect on every state change
  const callWSRef = useRef(hass.callWS);
  callWSRef.current = hass.callWS;

  // Fetch automation configs and extract helper entity_ids via regex
  useEffect(() => {
    if (automationEntityIds.length === 0 || helpersLoaded) return;

    const fetchConfigs = async () => {
      const result: Record<string, string[]> = {};
      // Get all known helper entity_ids for validation
      const knownHelpers = new Set(
        Object.keys(hass.states).filter((eid) => HELPER_DOMAINS.includes(getDomain(eid)))
      );

      await Promise.all(
        automationEntityIds.map(async (eid) => {
          try {
            // automation entity_id → automation id (the unique_id used in config)
            const automationId = eid.replace("automation.", "");
            const config = await callWSRef.current<Record<string, unknown>>({
              type: "automation/config",
              entity_id: eid,
            }).catch(() =>
              // Fallback: try with the automation ID directly
              callWSRef.current<Record<string, unknown>>({
                type: "automation/config",
                automation_id: automationId,
              }).catch(() => null)
            );
            if (!config) return;

            // Stringify the config and extract all input_* entity_ids
            const configStr = JSON.stringify(config);
            const matches = new Set(configStr.match(HELPER_ENTITY_RE) ?? []);
            // Only keep helpers that actually exist in HA
            const helpers = [...matches].filter((id) => knownHelpers.has(id));
            if (helpers.length > 0) result[eid] = helpers;
          } catch {
            // config fetch failed — skip
          }
        }),
      );
      setAutomationHelpers(result);
      setHelpersLoaded(true);
    };

    fetchConfigs();
  }, [automationEntityIds, helpersLoaded]);

  // Group automations by category
  const groups = useMemo(() => {
    const catIdToName = new Map<string, string>();
    for (const cat of automationCategories) {
      catIdToName.set(cat.category_id, cat.name);
    }

    const nameMap = new Map<string, CategoryGroup>();
    const uncategorized: CategoryGroup = { category: null, automations: [], };

    for (const entry of entityRegistry) {
      if (getDomain(entry.entity_id) !== "automation") continue;

      let catName: string | undefined;
      if (entry.categories) {
        for (const catId of Object.values(entry.categories)) {
          const name = catIdToName.get(catId);
          if (name) { catName = name; break; }
        }
      }

      if (catName) {
        let group = nameMap.get(catName);
        if (!group) {
          const catObj = automationCategories.find((c) => c.name === catName) ?? { category_id: catName, name: catName };
          group = { category: catObj, automations: [], };
          nameMap.set(catName, group);
        }
        group.automations.push(entry.entity_id);
      } else {
        uncategorized.automations.push(entry.entity_id);
      }
    }

    const result = Array.from(nameMap.values());
    if (uncategorized.automations.length > 0) result.push(uncategorized);
    return result;
  }, [entityRegistry, automationCategories]);

  // Filter by search
  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return groups;
    return groups.map((g) => ({
      ...g,
      automations: g.automations.filter((eid) => {
        const entity = hass.states[eid];
        const name = getFriendlyName(entity, eid).toLowerCase();
        return name.includes(q) || eid.includes(q);
      }),
    })).filter((g) => g.automations.length > 0);
  }, [groups, search, hass.states]);

  const totalAutomations = groups.reduce((sum, g) => sum + g.automations.length, 0);

  return (
    <div className="flex flex-col" style={{ minHeight: 0, flex: 1 }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2" style={{ paddingRight: 44 }}>
        <h3 className="text-sm font-semibold uppercase tracking-wide">
          Automations
        </h3>
        <span className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>
          {totalAutomations} automation{totalAutomations !== 1 ? "s" : ""} in {groups.length} group{groups.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Search */}
      <div className="px-4 pb-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search automations..."
          className="w-full px-2.5 py-1.5 rounded-lg text-xs outline-none"
          style={{
            backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0",
            color: "var(--fp-text)",
            border: `1px solid ${isDark ? "#444" : "#ddd"}`,
          }}
        />
      </div>

      {/* Category groups */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2" style={{ scrollbarWidth: "thin" }}>
        {filteredGroups.map((group) => {
          const catId = group.category?.category_id ?? "__uncategorized__";
          const catName = group.category?.name ?? "Uncategorized";
          const isExpanded = expandedCategories.has(catId) || expandedCategories.has("__all__");

          return (
            <div key={catId}>
              {/* Category header */}
              <button
                onClick={() => {
                  // Remove __all__ on first manual toggle
                  setExpandedCategories((prev) => {
                    const next = new Set(prev);
                    next.delete("__all__");
                    if (next.has(catId)) next.delete(catId);
                    else next.add(catId);
                    return next;
                  });
                }}
                className="w-full flex items-center gap-1.5 py-1.5 text-left"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fp-text)" }}
              >
                <svg
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  stroke="currentColor" strokeWidth="1.5"
                  style={{
                    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.15s",
                    color: "var(--fp-text-secondary)",
                  }}
                >
                  <path d="M3 1.5l4 3.5-4 3.5" />
                </svg>
                <span className="text-[11px] font-semibold uppercase tracking-wider flex-1">
                  {catName}
                </span>
                <span className="text-[10px]" style={{ color: "var(--fp-text-secondary)" }}>
                  {group.automations.length}
                </span>
              </button>

              {/* Automations in this category */}
              {isExpanded && (
                <div className="space-y-1.5 pb-1">
                  {group.automations.map((eid) => (
                    <AutomationCard
                      key={eid}
                      entityId={eid}
                      entity={hass.states[eid]}
                      hass={hass}
                      isDark={isDark}
                      helpers={automationHelpers[eid] ?? []}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredGroups.length === 0 && (
          <div className="text-center py-8 text-xs" style={{ color: "var(--fp-text-secondary)" }}>
            {search ? `No automations match "${search}"` : "No automations found"}
          </div>
        )}
      </div>
    </div>
  );
}
