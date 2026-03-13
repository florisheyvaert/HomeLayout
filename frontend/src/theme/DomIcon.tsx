import type { IconData } from "./types";

interface DomIconProps {
  icon: IconData;
  size?: number; // in px, default 24
  fill?: string;
  opacity?: number;
  className?: string;
}

/** Cache for colored emoji data URLs */
const emojiUrlCache = new Map<string, string>();

function getColoredEmojiUrl(emoji: string, size: number, fill: string): string {
  const key = `${emoji}:${size}:${fill}`;
  let url = emojiUrlCache.get(key);
  if (!url) {
    const px = Math.ceil(size * 1.4);
    const canvas = document.createElement("canvas");
    canvas.width = px;
    canvas.height = px;
    const ctx = canvas.getContext("2d")!;
    ctx.font = `${size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = fill;
    ctx.fillText(emoji, px / 2, px / 2);
    url = canvas.toDataURL();
    emojiUrlCache.set(key, url);
  }
  return url;
}

/**
 * Renders an icon in DOM context (sidebar, controls).
 * - emoji → <span> (or <img> when fill is specified, to match canvas coloring)
 * - path → <svg> with <path>
 */
export function DomIcon({ icon, size = 24, fill, opacity = 1, className }: DomIconProps) {
  if (icon.type === "emoji") {
    if (fill) {
      const px = Math.ceil(size * 1.4);
      const url = getColoredEmojiUrl(icon.value, size, fill);
      return (
        <img
          className={className}
          src={url}
          width={px}
          height={px}
          style={{ opacity, display: "inline-block", verticalAlign: "middle", width: size, height: size, objectFit: "contain" }}
          alt=""
        />
      );
    }
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
