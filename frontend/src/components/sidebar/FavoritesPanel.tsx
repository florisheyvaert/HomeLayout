import { useState } from "react";
import type { FavoriteItem, HomeAssistant } from "../../types";
import { FavoriteCard } from "./FavoriteCard";

interface FavoritesPanelProps {
  favorites: FavoriteItem[];
  hass: HomeAssistant;
  isDark: boolean;
  onRemoveFavorite: (id: string) => void;
  onShowEditor: () => void;
}

export function FavoritesPanel({ favorites, hass, isDark, onRemoveFavorite, onShowEditor }: FavoritesPanelProps) {
  const [editMode, setEditMode] = useState(false);

  const sorted = [...favorites].sort((a, b) => a.order - b.order);

  const btnStyle = (active?: boolean): React.CSSProperties => ({
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "none",
    backgroundColor: active ? "var(--fp-accent)" : isDark ? "#333" : "#e8e8e8",
    color: active ? "#fff" : "var(--fp-text)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", minHeight: "100%" }}>
      {/* Header */}
      <div style={{ marginBottom: 12, paddingRight: 36 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--fp-text)", margin: 0 }}>
          Quick Access
        </h3>
      </div>

      {/* Grid or empty state */}
      {sorted.length === 0 ? (
        <div
          onClick={onShowEditor}
          style={{
            padding: 24,
            textAlign: "center",
            borderRadius: 12,
            backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0",
            cursor: "pointer",
          }}
        >
          <p style={{ fontSize: 13, color: "var(--fp-text-secondary)", margin: 0 }}>
            Tap + to add your favorite entities
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {sorted.map((item) => (
            <FavoriteCard
              key={item.id}
              item={item}
              entity={hass.states[item.entity_id]}
              hass={hass}
              isDark={isDark}
              editMode={editMode}
              onRemove={onRemoveFavorite}
            />
          ))}
        </div>
      )}

      {/* Actions pinned to bottom */}
      <div style={{ display: "flex", gap: 4, marginTop: "auto", paddingTop: 12 }}>
        <button onClick={onShowEditor} title="Add favorite" style={{ ...btnStyle(), fontSize: 18 }}>
          +
        </button>
        <button
          onClick={() => setEditMode((e) => !e)}
          title={editMode ? "Done editing" : "Edit favorites"}
          style={{ ...btnStyle(editMode), fontSize: 14 }}
        >
          &#9998;
        </button>
      </div>
    </div>
  );
}
