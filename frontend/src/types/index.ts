export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService: (
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: { entity_id?: string | string[] }
  ) => Promise<void>;
  callWS: <T>(msg: Record<string, unknown>) => Promise<T>;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HomeLayoutStore {
  version: 1;
  floors: FloorConfig[];
  favorites: FavoriteItem[];
  settings: GlobalSettings;
}

export type FloorBackgroundType = "none" | "color" | "image" | "preset";

export interface FloorBackground {
  type: FloorBackgroundType;
  /** Hex color when type === "color" */
  color?: string;
  /** Image URL when type === "image" (relative HA path or data URL) */
  image?: string;
  /** Preset ID when type === "preset" */
  preset?: string;
  /** Image opacity 0–1, default 1 */
  opacity?: number;
}

export interface FloorConfig {
  id: string;
  ha_floor_id: string | null;
  name: string;
  order: number;
  rooms: Room[];
  entities: EntityPlacement[];
  furniture: FurniturePlacement[];
  background?: FloorBackground;
}

export type LabelVertical = "top" | "middle" | "bottom";
export type LabelHorizontal = "left" | "center" | "right";

export type BadgePosition =
  | "top-left" | "top-center" | "top-right"
  | "center-left" | "center" | "center-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

export interface RoomBadge {
  id: string;
  entity_id: string;
  position: BadgePosition;
  show_icon: boolean;
  show_name: boolean;
  show_attribute?: string;
  icon_override?: SerializedIconRef;
}

export interface Room {
  id: string;
  name: string;
  ha_area_id: string | null;
  points: Point[];
  label_visible: boolean;
  label_v?: LabelVertical;
  label_h?: LabelHorizontal;
  badges?: RoomBadge[];
}

export interface Point {
  x: number;
  y: number;
}

export interface EntityPlacement {
  id: string;
  entity_id: string;
  x: number;
  y: number;
  icon_size?: number;
  font_size?: number;
  label_visible: boolean;
  show_icon: boolean;
  show_state: boolean;
  /** When set, shows this attribute value instead of the state */
  show_attribute?: string;
  /** Camera entities: show live preview thumbnail (default true) */
  show_camera_preview?: boolean;
}

export interface FavoriteItem {
  id: string;
  type: "entity" | "scene" | "script" | "automation" | "button";
  entity_id: string;
  label: string;
  icon: string;
  order: number;
}

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface DeviceViewportPreset {
  default_zoom: number;      // 0.1–5
  default_rotation: 0 | 90 | 180 | 270;
}

export interface GlobalSettings {
  default_floor_id: string | null;
  grid_enabled: boolean;
  grid_size: number;
  show_entity_labels: boolean;
  theme: "system" | "light" | "dark";
  theme_config_id: string;
  icon_pack_id: string;
  font_id: string;
  default_icon_size?: number;
  domain_icon_sizes?: Record<string, number>;
  domain_colors?: Record<string, string>;
  domain_icons?: Record<string, SerializedIconRef>;
  furniture_icons?: Record<string, SerializedIconRef>;
  device_viewports?: Partial<Record<DeviceType, DeviceViewportPreset>>;
}

export interface HaFloor {
  floor_id: string;
  name: string;
  level: number | null;
  icon: string | null;
  aliases: string[];
}

export interface HaArea {
  area_id: string;
  name: string;
  floor_id: string | null;
  icon: string | null;
  aliases: string[];
}

export interface HaEntityRegistryEntry {
  entity_id: string;
  name: string | null;
  platform: string;
  area_id: string | null;
  device_id: string | null;
  /** Category IDs keyed by scope (e.g. { automation: "cat_id_123" }) */
  categories?: Record<string, string>;
}

export interface HaCategory {
  category_id: string;
  name: string;
}

export type FurnitureType =
  | "sofa" | "chair" | "table" | "desk" | "bed"
  | "wardrobe" | "bookshelf" | "tv" | "plant"
  | "door" | "window"
  | "toilet" | "shower" | "sink" | "bathtub"
  | "fridge" | "oven" | "dishwasher";

export interface FurniturePlacement {
  id: string;
  type: FurnitureType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface SerializedIconRef {
  pack_id: string;
  domain: string;
  device_class?: string;
}

export type AppMode = "view" | "edit";
export type CanvasTool = "select" | "multiselect" | "draw" | "draw-rect" | "draw-circle" | "draw-triangle" | "place" | "furniture";
