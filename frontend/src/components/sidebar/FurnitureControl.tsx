import type { FurniturePlacement } from "../../types";
import { getCatalogEntry } from "../../furniture/catalog";
import { useThemeConfig, DomIcon } from "../../theme";

interface FurnitureControlProps {
  placement: FurniturePlacement;
  gridSize: number;
  onUpdate: (id: string, updates: Partial<FurniturePlacement>) => void;
  onRemove: (id: string) => void;
  isDark: boolean;
}

export function FurnitureControl({
  placement,
  gridSize,
  onUpdate,
  onRemove,
  isDark,
}: FurnitureControlProps) {
  const entry = getCatalogEntry(placement.type);
  const { resolveEntityIcon } = useThemeConfig();
  const { icon } = resolveEntityIcon("furniture", "on", placement.type);

  const gridW = Math.round(placement.width / gridSize);
  const gridH = Math.round(placement.height / gridSize);

  const handleWidthChange = (val: number) => {
    const clamped = Math.max(1, val);
    onUpdate(placement.id, { width: clamped * gridSize });
  };

  const handleHeightChange = (val: number) => {
    const clamped = Math.max(1, val);
    onUpdate(placement.id, { height: clamped * gridSize });
  };

  const handleRotate = () => {
    onUpdate(placement.id, {
      rotation: ((placement.rotation + 90) % 360) as 0 | 90 | 180 | 270,
    });
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#333" : "#fff",
    borderColor: isDark ? "#555" : "#d1d5db",
    color: "var(--fp-text)",
  };

  const btnStyle: React.CSSProperties = {
    backgroundColor: isDark ? "#333" : "#e8e8e8",
    color: "var(--fp-text)",
    border: "none",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: 13,
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <DomIcon icon={icon} size={28} />
        <div>
          <h3 className="text-sm font-semibold">{entry.label}</h3>
          <p className="text-xs" style={{ color: "var(--fp-text-secondary)" }}>
            {entry.category}
          </p>
        </div>
      </div>

      {/* Size controls */}
      <div className="space-y-2">
        <label className="text-xs font-medium block" style={{ color: "var(--fp-text-secondary)" }}>
          Size (grid units)
        </label>
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <label className="text-xs block mb-1">Width</label>
            <input
              type="number"
              min={1}
              value={gridW}
              onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2.5 rounded-lg border text-sm"
              style={inputStyle}
            />
          </div>
          <span className="text-xs mt-5" style={{ color: "var(--fp-text-secondary)" }}>&times;</span>
          <div className="flex-1">
            <label className="text-xs block mb-1">Height</label>
            <input
              type="number"
              min={1}
              value={gridH}
              onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2.5 rounded-lg border text-sm"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Rotate button */}
      <button
        onClick={handleRotate}
        style={btnStyle}
        className="w-full flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
        Rotate 90°
      </button>

      {/* Remove button */}
      <button
        onClick={() => onRemove(placement.id)}
        style={{
          ...btnStyle,
          backgroundColor: isDark ? "#442222" : "#fee2e2",
          color: isDark ? "#ff8888" : "#dc2626",
        }}
        className="w-full"
      >
        Remove
      </button>
    </div>
  );
}
