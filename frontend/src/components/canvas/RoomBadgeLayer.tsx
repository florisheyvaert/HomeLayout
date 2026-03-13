import { Group, Text } from "react-konva";
import { KonvaIcon } from "../../theme/KonvaIcon";
import { useThemeConfig } from "../../theme";
import { resolveIcon } from "../../theme/resolveIcon";
import { iconPacks } from "../../theme/packs";
import type { Room, Point, BadgePosition, HomeAssistant } from "../../types";

interface RoomBadgeLayerProps {
  rooms: Room[];
  hass: HomeAssistant;
  isDark: boolean;
  stageRotation: number;
}

const BADGE_PADDING = 10;
const BADGE_ICON_SIZE = 16;
const BADGE_FONT_SIZE = 10;
const BADGE_LINE_HEIGHT = 16;
const BADGE_GAP = 2;

function getRoomCenter(points: Point[]) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}

/** Compute room bounding box in screen-aligned local space (after counter-rotation) */
function getLocalBounds(points: Point[], cx: number, cy: number, stageRotation: number) {
  const rad = (stageRotation * Math.PI) / 180;
  const cosR = Math.cos(rad);
  const sinR = Math.sin(rad);

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of points) {
    const dx = p.x - cx;
    const dy = p.y - cy;
    const lx = dx * cosR + dy * sinR;
    const ly = -dx * sinR + dy * cosR;
    if (lx < minX) minX = lx;
    if (lx > maxX) maxX = lx;
    if (ly < minY) minY = ly;
    if (ly > maxY) maxY = ly;
  }
  return { minX, maxX, minY, maxY };
}

function getLocalAnchor(
  lb: { minX: number; maxX: number; minY: number; maxY: number },
  position: BadgePosition,
): { x: number; y: number; alignH: "left" | "center" | "right"; alignV: "top" | "middle" | "bottom" } {
  const cx = (lb.minX + lb.maxX) / 2;
  const cy = (lb.minY + lb.maxY) / 2;

  const [vPart, hPart] = position.includes("-")
    ? position.split("-") as [string, string]
    : ["center", position];

  let x: number;
  let alignH: "left" | "center" | "right";
  if (hPart === "left") { x = lb.minX + BADGE_PADDING; alignH = "left"; }
  else if (hPart === "right") { x = lb.maxX - BADGE_PADDING; alignH = "right"; }
  else { x = cx; alignH = "center"; }

  let y: number;
  let alignV: "top" | "middle" | "bottom";
  if (vPart === "top") { y = lb.minY + BADGE_PADDING; alignV = "top"; }
  else if (vPart === "bottom") { y = lb.maxY - BADGE_PADDING; alignV = "bottom"; }
  else { y = cy; alignV = "middle"; }

  return { x, y, alignH, alignV };
}

export function RoomBadgeLayer({ rooms, hass, isDark, stageRotation }: RoomBadgeLayerProps) {
  const { resolveEntityIcon, getDomainColor, fontFamily } = useThemeConfig();

  const badgeNodes: React.ReactNode[] = [];

  for (const room of rooms) {
    const badges = room.badges;
    if (!badges || badges.length === 0) continue;

    const center = getRoomCenter(room.points);
    // Bounds in screen-aligned local space (inside the counter-rotated group)
    const localBounds = getLocalBounds(room.points, center.x, center.y, stageRotation);

    // Group badges by position for stacking
    const grouped = new Map<BadgePosition, typeof badges>();
    for (const badge of badges) {
      const list = grouped.get(badge.position) ?? [];
      list.push(badge);
      grouped.set(badge.position, list);
    }

    for (const [position, positionBadges] of grouped) {
      const anchor = getLocalAnchor(localBounds, position);

      // Pre-compute each badge's content
      const badgeData = positionBadges.map((badge) => {
        const entity = hass.states[badge.entity_id];
        const domain = badge.entity_id.split(".")[0];
        const state = entity?.state ?? "unavailable";
        const deviceClass = entity?.attributes?.device_class as string | undefined;
        const isActive = state === "on" || state === "open" || state === "playing" || state === "unlocked";
        const isUnavailable = state === "unavailable" || state === "unknown";
        let icon = resolveEntityIcon(domain, state, deviceClass).icon;
        if (badge.icon_override) {
          const pack = iconPacks[badge.icon_override.pack_id];
          if (pack) {
            icon = resolveIcon(pack, badge.icon_override.domain, state, badge.icon_override.device_class).icon;
          }
        }

        let displayText: string;
        if (badge.show_attribute && entity) {
          const attrVal = entity.attributes?.[badge.show_attribute];
          if (attrVal == null) {
            displayText = "?";
          } else {
            const unit = entity.attributes?.unit_of_measurement as string | undefined;
            displayText = unit ? `${attrVal}${unit}` : String(attrVal);
          }
        } else {
          const unit = entity?.attributes?.unit_of_measurement as string | undefined;
          displayText = unit ? `${state}${unit}` : state;
        }

        const name = badge.show_name
          ? ((entity?.attributes?.friendly_name as string) ?? badge.entity_id.split(".")[1])
          : null;

        const color = isUnavailable
          ? (isDark ? "#555" : "#bbb")
          : isActive
            ? getDomainColor(domain)
            : (isDark ? "#999" : "#777");

        const hasIcon = badge.show_icon;
        const iconSpace = hasIcon ? BADGE_ICON_SIZE + 3 : 0;
        const fullText = name ? `${name}: ${displayText}` : displayText;
        const estTextWidth = fullText.length * 5.5;
        const totalWidth = iconSpace + estTextWidth;

        return { badge, icon, displayText, name, color, hasIcon, iconSpace, totalWidth };
      });

      const totalHeight = positionBadges.length * BADGE_LINE_HEIGHT + (positionBadges.length - 1) * BADGE_GAP;

      let startY: number;
      if (anchor.alignV === "top") startY = anchor.y;
      else if (anchor.alignV === "bottom") startY = anchor.y - totalHeight;
      else startY = anchor.y - totalHeight / 2;

      // Single counter-rotated group at the room center; all positioning is in local screen space
      badgeNodes.push(
        <Group
          key={`${room.id}-pos-${position}`}
          x={center.x}
          y={center.y}
          rotation={-stageRotation}
          listening={false}
        >
          {badgeData.map((d, idx) => {
            const textColor = isDark ? "#ccc" : "#444";
            const lineY = startY + idx * (BADGE_LINE_HEIGHT + BADGE_GAP);

            let lineX: number;
            if (anchor.alignH === "left") lineX = anchor.x;
            else if (anchor.alignH === "right") lineX = anchor.x - d.totalWidth;
            else lineX = anchor.x - d.totalWidth / 2;

            return (
              <Group key={d.badge.id} x={lineX} y={lineY}>
                {d.hasIcon && (
                  <KonvaIcon
                    icon={d.icon}
                    size={BADGE_ICON_SIZE}
                    fill={d.color}
                    x={BADGE_ICON_SIZE / 2}
                    y={BADGE_LINE_HEIGHT / 2}
                  />
                )}
                {d.name && (
                  <Text
                    x={d.iconSpace}
                    y={(BADGE_LINE_HEIGHT - BADGE_FONT_SIZE) / 2}
                    text={`${d.name}: `}
                    fontSize={BADGE_FONT_SIZE}
                    fontFamily={fontFamily}
                    fill={textColor}
                    opacity={0.6}
                    listening={false}
                  />
                )}
                <Text
                  x={d.iconSpace + (d.name ? d.name.length * 5.5 + 10 : 0)}
                  y={(BADGE_LINE_HEIGHT - BADGE_FONT_SIZE) / 2}
                  text={d.displayText}
                  fontSize={BADGE_FONT_SIZE}
                  fontFamily={fontFamily}
                  fontStyle="bold"
                  fill={d.color}
                  opacity={0.85}
                  listening={false}
                />
              </Group>
            );
          })}
        </Group>,
      );
    }
  }

  if (badgeNodes.length === 0) return null;
  return <>{badgeNodes}</>;
}
