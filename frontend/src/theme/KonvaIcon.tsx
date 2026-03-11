import { Path, Group, Image as KonvaImage } from "react-konva";
import type { IconData } from "./types";

interface KonvaIconProps {
  icon: IconData;
  size: number; // icon_size from EntityPlacement
  fill?: string;
  opacity?: number;
  x?: number;
  y?: number;
}

/**
 * Render an emoji string to an offscreen canvas and return as HTMLCanvasElement.
 * This avoids platform-specific issues with Konva Text + emoji.
 */
function renderEmojiToCanvas(emoji: string, fontSize: number, fill?: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const px = Math.ceil(fontSize * 1.4);
  canvas.width = px;
  canvas.height = px;
  const ctx = canvas.getContext("2d")!;
  ctx.font = `${fontSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (fill) ctx.fillStyle = fill;
  ctx.fillText(emoji, px / 2, px / 2);
  return canvas;
}

/** Cache for rendered emoji canvases (key: emoji+size) */
const emojiCache = new Map<string, HTMLCanvasElement>();

function getEmojiCanvas(emoji: string, fontSize: number, fill?: string): HTMLCanvasElement {
  const key = `${emoji}:${fontSize}:${fill ?? ""}`;
  let cached = emojiCache.get(key);
  if (!cached) {
    cached = renderEmojiToCanvas(emoji, fontSize, fill);
    emojiCache.set(key, cached);
  }
  return cached;
}

/**
 * Renders an icon on the Konva canvas.
 * - emoji → Rendered to offscreen canvas, displayed as Konva Image
 * - path → Konva Path (scales to fit icon_size, supports any viewBox)
 */
export function KonvaIcon({ icon, size, fill, opacity = 1, x = 0, y = 0 }: KonvaIconProps) {
  if (icon.type === "emoji") {
    const fontSize = Math.round(size * 0.55);
    const emojiCanvas = getEmojiCanvas(icon.value, fontSize, fill);
    const imgSize = emojiCanvas.width;

    return (
      <KonvaImage
        x={x - imgSize / 2}
        y={y - imgSize / 2}
        width={imgSize}
        height={imgSize}
        image={emojiCanvas}
        opacity={opacity}
        listening={false}
      />
    );
  }

  // SVG path: scale to fit within size * 0.5
  const vw = icon.viewBox?.w ?? 24;
  const vh = icon.viewBox?.h ?? 24;
  const targetSize = size * 0.5;
  // Uniform scale that fits the icon in a square
  const scale = targetSize / Math.max(vw, vh);
  const offsetX = (vw * scale) / 2;
  const offsetY = (vh * scale) / 2;

  return (
    <Group x={x} y={y} opacity={opacity}>
      <Path
        x={-offsetX}
        y={-offsetY}
        data={icon.value}
        fill={fill ?? "#ffffff"}
        scaleX={scale}
        scaleY={scale}
        listening={false}
      />
    </Group>
  );
}
