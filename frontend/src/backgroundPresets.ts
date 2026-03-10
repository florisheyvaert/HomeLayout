export interface BackgroundPreset {
  id: string;
  name: string;
  /** CSS to apply as inline style on the background div */
  style: React.CSSProperties;
  /** Optional keyframes CSS to inject (animation name must be unique) */
  keyframes?: string;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: "gradient-drift",
    name: "Gradient Drift",
    keyframes: `@keyframes bg-drift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`,
    style: {
      background: "linear-gradient(135deg, #667eea, #764ba2, #f093fb, #667eea)",
      backgroundSize: "400% 400%",
      animation: "bg-drift 20s ease infinite",
    },
  },
  {
    id: "aurora",
    name: "Aurora",
    keyframes: `@keyframes bg-aurora{0%,100%{background-position:0% 0%}25%{background-position:100% 0%}50%{background-position:100% 100%}75%{background-position:0% 100%}}`,
    style: {
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364, #0f2027)",
      backgroundSize: "300% 300%",
      animation: "bg-aurora 25s ease infinite",
    },
  },
  {
    id: "warm-glow",
    name: "Warm Glow",
    keyframes: `@keyframes bg-warmglow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`,
    style: {
      background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460, #533483, #1a1a2e)",
      backgroundSize: "400% 400%",
      animation: "bg-warmglow 18s ease infinite",
    },
  },
  {
    id: "ocean-calm",
    name: "Ocean Calm",
    keyframes: `@keyframes bg-ocean{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}`,
    style: {
      background: "linear-gradient(135deg, #0c1445, #183d6e, #1a6b8a, #2d8f9c, #0c1445)",
      backgroundSize: "400% 400%",
      animation: "bg-ocean 22s ease infinite",
    },
  },
  {
    id: "subtle-mesh",
    name: "Subtle Mesh",
    keyframes: `@keyframes bg-mesh{0%,100%{background-position:0% 0%}50%{background-position:100% 100%}}`,
    style: {
      background: `
        radial-gradient(at 20% 30%, rgba(59,130,246,0.15) 0%, transparent 50%),
        radial-gradient(at 80% 70%, rgba(168,85,247,0.12) 0%, transparent 50%),
        radial-gradient(at 50% 50%, rgba(16,185,129,0.1) 0%, transparent 60%)
      `,
      backgroundSize: "200% 200%",
      animation: "bg-mesh 30s ease infinite",
    },
  },
];

/** Get a preset by ID */
export function getPreset(id: string): BackgroundPreset | undefined {
  return BACKGROUND_PRESETS.find((p) => p.id === id);
}
