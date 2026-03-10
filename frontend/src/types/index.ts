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

export interface FloorConfig {
  id: string;
  ha_floor_id: string | null;
  name: string;
  order: number;
  rooms: Room[];
  entities: EntityPlacement[];
  furniture: FurniturePlacement[];
}

export type LabelVertical = "top" | "middle" | "bottom";
export type LabelHorizontal = "left" | "center" | "right";

export interface Room {
  id: string;
  name: string;
  ha_area_id: string | null;
  points: Point[];
  label_visible: boolean;
  label_v?: LabelVertical;
  label_h?: LabelHorizontal;
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
  label_visible: boolean;
  show_icon: boolean;
  show_state: boolean;
}

export interface FavoriteItem {
  id: string;
  type: "entity" | "scene" | "script" | "automation" | "button";
  entity_id: string;
  label: string;
  icon: string;
  order: number;
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
export type CanvasTool = "select" | "multiselect" | "draw" | "place" | "furniture";
