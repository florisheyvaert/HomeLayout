import type { FurnitureType } from "../types";

export interface FurnitureCatalogEntry {
  type: FurnitureType;
  label: string;
  category: string;
  defaultGridW: number;
  defaultGridH: number;
}

export const FURNITURE_CATEGORIES = ["Living", "Bedroom", "Bathroom", "Kitchen", "Other"] as const;

export const furnitureCatalog: FurnitureCatalogEntry[] = [
  // Living
  { type: "sofa", label: "Sofa", category: "Living", defaultGridW: 6, defaultGridH: 3 },
  { type: "chair", label: "Chair", category: "Living", defaultGridW: 2, defaultGridH: 2 },
  { type: "table", label: "Table", category: "Living", defaultGridW: 4, defaultGridH: 3 },
  { type: "tv", label: "TV", category: "Living", defaultGridW: 4, defaultGridH: 1 },
  { type: "bookshelf", label: "Bookshelf", category: "Living", defaultGridW: 4, defaultGridH: 1 },
  { type: "plant", label: "Plant", category: "Living", defaultGridW: 2, defaultGridH: 2 },

  // Bedroom
  { type: "bed", label: "Bed", category: "Bedroom", defaultGridW: 5, defaultGridH: 7 },
  { type: "desk", label: "Desk", category: "Bedroom", defaultGridW: 4, defaultGridH: 2 },
  { type: "wardrobe", label: "Wardrobe", category: "Bedroom", defaultGridW: 4, defaultGridH: 2 },

  // Bathroom
  { type: "toilet", label: "Toilet", category: "Bathroom", defaultGridW: 2, defaultGridH: 2 },
  { type: "shower", label: "Shower", category: "Bathroom", defaultGridW: 3, defaultGridH: 3 },
  { type: "sink", label: "Sink", category: "Bathroom", defaultGridW: 2, defaultGridH: 2 },
  { type: "bathtub", label: "Bathtub", category: "Bathroom", defaultGridW: 3, defaultGridH: 6 },

  // Kitchen
  { type: "fridge", label: "Fridge", category: "Kitchen", defaultGridW: 2, defaultGridH: 2 },
  { type: "oven", label: "Oven", category: "Kitchen", defaultGridW: 2, defaultGridH: 2 },
  { type: "dishwasher", label: "Dishwasher", category: "Kitchen", defaultGridW: 2, defaultGridH: 2 },

  // Other
  { type: "door", label: "Door", category: "Other", defaultGridW: 3, defaultGridH: 1 },
  { type: "window", label: "Window", category: "Other", defaultGridW: 3, defaultGridH: 1 },
];

export function getCatalogEntry(type: FurnitureType): FurnitureCatalogEntry {
  return furnitureCatalog.find((e) => e.type === type) ?? furnitureCatalog[0];
}
