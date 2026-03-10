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

  return (
    <div style={{ padding: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--fp-text)", margin: 0 }}>
          Quick Access
        </h3>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={onShowEditor}
            title="Add favorite"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              backgroundColor: isDark ? "#333" : "#e8e8e8",
              color: "var(--fp-text)",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
          <button
            onClick={() => setEditMode((e) => !e)}
            title={editMode ? "Done editing" : "Edit favorites"}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              backgroundColor: editMode ? "var(--fp-accent)" : isDark ? "#333" : "#e8e8e8",
              color: editMode ? "#fff" : "var(--fp-text)",
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &#9998;
          </button>
        </div>
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
    </div>
  );
}
