import type { AppMode, CanvasTool, FloorConfig, GlobalSettings } from "../types";

interface ToolbarProps {
  mode: AppMode;
  onToggleMode: () => void;
  activeTool: CanvasTool;
  onSelectTool: (tool: CanvasTool) => void;
  floors: FloorConfig[];
  currentFloorId: string | null;
  onSwitchFloor: (id: string) => void;
  gridEnabled: boolean;
  onToggleGrid: () => void;
  isDark: boolean;
  themePreference: GlobalSettings["theme"];
  onCycleTheme: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  showAppearance: boolean;
  onToggleAppearance: () => void;
}

const themeIcons: Record<GlobalSettings["theme"], string> = {
  system: "◑",
  light: "☀",
  dark: "☾",
};

export function Toolbar({
  mode,
  onToggleMode,
  activeTool,
  onSelectTool,
  floors,
  currentFloorId,
  onSwitchFloor,
  gridEnabled,
  onToggleGrid,
  isDark,
  themePreference,
  onCycleTheme,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  showAppearance,
  onToggleAppearance,
}: ToolbarProps) {
  const btn = (active: boolean) =>
    `px-3 py-1 rounded text-sm ${
      active
        ? "bg-blue-600 text-white"
        : isDark
          ? "bg-neutral-700 text-neutral-200 hover:bg-neutral-600"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }`;

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 border-b"
      style={{
        backgroundColor: "var(--fp-card)",
        borderColor: "var(--fp-border)",
        color: "var(--fp-text)",
      }}
    >
      {/* Floor tabs */}
      <div className="flex items-center gap-1 mr-4">
        {floors.map((floor) => (
          <button
            key={floor.id}
            onClick={() => onSwitchFloor(floor.id)}
            className={btn(floor.id === currentFloorId)}
          >
            {floor.name}
          </button>
        ))}
      </div>

      <div className="w-px h-6" style={{ backgroundColor: "var(--fp-border)" }} />

      {/* Edit mode tools */}
      {mode === "edit" && (
        <>
          <button
            onClick={() =>
              onSelectTool(activeTool === "draw" ? "select" : "draw")
            }
            className={`${btn(activeTool === "draw")} flex items-center gap-1`}
          >
            <span>⬠</span>
            <span>Draw Room</span>
          </button>

          <button
            onClick={() =>
              onSelectTool(activeTool === "place" ? "select" : "place")
            }
            className={`${btn(activeTool === "place")} flex items-center gap-1`}
          >
            <span>◎</span>
            <span>Place Entity</span>
          </button>

          <button onClick={onToggleGrid} className={btn(gridEnabled)}>
            Grid
          </button>

          <div className="w-px h-6" style={{ backgroundColor: "var(--fp-border)" }} />

          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`${btn(false)} ${!canUndo ? "opacity-40 cursor-not-allowed" : ""}`}
            title="Undo (Ctrl+Z)"
          >
            ↩
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`${btn(false)} ${!canRedo ? "opacity-40 cursor-not-allowed" : ""}`}
            title="Redo (Ctrl+Y)"
          >
            ↪
          </button>

          {activeTool === "draw" && (
            <span className="text-xs ml-2" style={{ color: "var(--fp-text-secondary)" }}>
              Click to place vertices, double-click to finish room
            </span>
          )}

          {activeTool === "place" && (
            <span className="text-xs ml-2" style={{ color: "var(--fp-text-secondary)" }}>
              Drag an entity from the sidebar onto the canvas
            </span>
          )}
        </>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Pan hint */}
      <span className="text-xs mr-2" style={{ color: "var(--fp-text-secondary)" }}>
        Right-click + drag to pan
      </span>

      {/* Appearance settings */}
      <button
        onClick={onToggleAppearance}
        className={btn(showAppearance)}
        title="Appearance settings"
      >
        &#9881;
      </button>

      {/* Theme toggle */}
      <button
        onClick={onCycleTheme}
        className={btn(false)}
        title={`Theme: ${themePreference}`}
      >
        {themeIcons[themePreference]}
      </button>

      {/* Mode toggle */}
      <button
        onClick={onToggleMode}
        className={`px-3 py-1.5 rounded text-sm font-medium ${
          mode === "edit"
            ? "bg-amber-500 text-white hover:bg-amber-600"
            : btn(false)
        }`}
      >
        {mode === "edit" ? "✓ Done" : "✎ Edit"}
      </button>
    </div>
  );
}
