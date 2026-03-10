import type { IconData } from "./types";

interface DomIconProps {
  icon: IconData;
  size?: number; // in px, default 24
  fill?: string;
  opacity?: number;
  className?: string;
}

/**
 * Renders an icon in DOM context (sidebar, controls).
 * - emoji → <span>
 * - path → <svg> with <path>
 */
export function DomIcon({ icon, size = 24, fill, opacity = 1, className }: DomIconProps) {
  if (icon.type === "emoji") {
    return (
      <span
        className={className}
        style={{ fontSize: size, lineHeight: 1, opacity }}
        role="img"
      >
        {icon.value}
      </span>
    );
  }

  const vw = icon.viewBox?.w ?? 24;
  const vh = icon.viewBox?.h ?? 24;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${vw} ${vh}`}
      width={size}
      height={size}
      style={{ opacity }}
    >
      <path d={icon.value} fill={fill ?? "currentColor"} />
    </svg>
  );
}
