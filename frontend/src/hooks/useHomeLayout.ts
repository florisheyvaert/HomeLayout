import { useState, useCallback, useRef, useEffect } from "react";
import type {
  HomeLayoutStore,
  FloorConfig,
  GlobalSettings,
  Room,
  Point,
  EntityPlacement,
  FurniturePlacement,
  FurnitureType,
  FavoriteItem,
  HomeAssistant,
  HaFloor,
  HaArea,
  HaEntityRegistryEntry,
} from "../types";
import { getCatalogEntry } from "../furniture/catalog";

const DEFAULT_STORE: HomeLayoutStore = {
  version: 1,
  floors: [],
  favorites: [],
  settings: {
    default_floor_id: null,
    grid_enabled: true,
    grid_size: 20,
    show_entity_labels: true,
    theme: "system" as const,
    theme_config_id: "default",
    icon_pack_id: "emoji",
    font_id: "roboto",
  },
};

const DEFAULT_ROOM_SIZE = 160;
const ROOM_SPACING = 20;
const ROOMS_PER_ROW = 4;
const START_OFFSET = 0;
const MAX_HISTORY = 50;

const STORAGE_KEY = "homelayout_config";

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function loadFromLocalStorage(): HomeLayoutStore | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveToLocalStorage(store: HomeLayoutStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore quota errors
  }
}

function createDefaultRoomsForAreas(areas: HaArea[]): Room[] {
  return areas.map((area, idx) => {
    const col = idx % ROOMS_PER_ROW;
    const row = Math.floor(idx / ROOMS_PER_ROW);
    const x = START_OFFSET + col * (DEFAULT_ROOM_SIZE + ROOM_SPACING);
    const y = START_OFFSET + row * (DEFAULT_ROOM_SIZE + ROOM_SPACING);

    return {
      id: generateId(),
      name: area.name,
      ha_area_id: area.area_id,
      label_visible: true,
      points: [
        { x, y },
        { x: x + DEFAULT_ROOM_SIZE, y },
        { x: x + DEFAULT_ROOM_SIZE, y: y + DEFAULT_ROOM_SIZE },
        { x, y: y + DEFAULT_ROOM_SIZE },
      ],
    };
  });
}

export function useHomeLayout(hass: HomeAssistant | null) {
  const [store, setStore] = useState<HomeLayoutStore>(DEFAULT_STORE);
  const [currentFloorId, setCurrentFloorId] = useState<string | null>(null);
  const [haFloors, setHaFloors] = useState<HaFloor[]>([]);
  const [haAreas, setHaAreas] = useState<HaArea[]>([]);
  const [entityRegistry, setEntityRegistry] = useState<HaEntityRegistryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Undo/redo history
  const historyRef = useRef<HomeLayoutStore[]>([]);
  const historyIndexRef = useRef(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateUndoRedoState = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  const currentFloor =
    store.floors.find((f) => f.id === currentFloorId) ?? null;

  // Load HA floors, areas, and saved config — then sync
  useEffect(() => {
    if (!hass || loaded) return;

    Promise.all([
      hass.callWS<HaFloor[]>({ type: "config/floor_registry/list" }),
      hass.callWS<HaArea[]>({ type: "config/area_registry/list" }),
      hass.callWS<HaEntityRegistryEntry[]>({ type: "config/entity_registry/list" }).catch(() => []),
      hass
        .callWS<HomeLayoutStore>({ type: "homelayout/config/get" })
        .catch(() => loadFromLocalStorage() ?? DEFAULT_STORE),
    ]).then(([floors, areas, entityReg, savedStore]) => {
      setHaFloors(floors);
      setHaAreas(areas);
      setEntityRegistry(entityReg);

      const sortedFloors = [...floors].sort(
        (a, b) => (a.level ?? 0) - (b.level ?? 0)
      );

      const syncedFloors: FloorConfig[] = sortedFloors.map((haFloor, idx) => {
        const existing = savedStore.floors.find(
          (f) => f.ha_floor_id === haFloor.floor_id
        );
        if (existing) {
          return { ...existing, name: haFloor.name, order: idx, furniture: existing.furniture ?? [] };
        }
        const floorAreas = areas.filter(
          (a) => a.floor_id === haFloor.floor_id
        );
        return {
          id: generateId(),
          ha_floor_id: haFloor.floor_id,
          name: haFloor.name,
          order: idx,
          rooms: createDefaultRoomsForAreas(floorAreas),
          entities: [],
          furniture: [],
        };
      });

      const newStore: HomeLayoutStore = {
        ...savedStore,
        floors: syncedFloors,
      };

      setStore(newStore);

      // Initialize history with loaded state
      historyRef.current = [newStore];
      historyIndexRef.current = 0;
      updateUndoRedoState();

      if (syncedFloors.length > 0) {
        const defaultId =
          newStore.settings.default_floor_id ?? syncedFloors[0].id;
        const validId = syncedFloors.find((f) => f.id === defaultId)
          ? defaultId
          : syncedFloors[0].id;
        setCurrentFloorId(validId);
      }

      setLoaded(true);
    });
  }, [hass, loaded]);

  // Persist to storage (debounced)
  const persist = useCallback(
    (newStore: HomeLayoutStore) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        saveToLocalStorage(newStore);
        hass?.callWS({
          type: "homelayout/config/save",
          config: newStore,
        }).catch(() => {});
      }, 500);
    },
    [hass]
  );

  // Save with history tracking
  const save = useCallback(
    (newStore: HomeLayoutStore) => {
      setStore(newStore);

      // Truncate any redo history and push new state
      const idx = historyIndexRef.current;
      historyRef.current = historyRef.current.slice(0, idx + 1);
      historyRef.current.push(newStore);

      // Limit history size
      if (historyRef.current.length > MAX_HISTORY) {
        historyRef.current = historyRef.current.slice(-MAX_HISTORY);
      }

      historyIndexRef.current = historyRef.current.length - 1;
      updateUndoRedoState();
      persist(newStore);
    },
    [persist, updateUndoRedoState]
  );

  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    const prevStore = historyRef.current[historyIndexRef.current];
    setStore(prevStore);
    updateUndoRedoState();
    persist(prevStore);
  }, [persist, updateUndoRedoState]);

  const redo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    const nextStore = historyRef.current[historyIndexRef.current];
    setStore(nextStore);
    updateUndoRedoState();
    persist(nextStore);
  }, [persist, updateUndoRedoState]);

  const updateFloor = useCallback(
    (floorId: string, updates: Partial<FloorConfig>) => {
      const newStore = {
        ...store,
        floors: store.floors.map((f) =>
          f.id === floorId ? { ...f, ...updates } : f
        ),
      };
      save(newStore);
    },
    [store, save]
  );

  const addRoom = useCallback(
    (points: Point[]) => {
      if (!currentFloorId) return;
      const room: Room = {
        id: generateId(),
        name: "New room",
        ha_area_id: null,
        label_visible: true,
        points,
      };
      const floor = store.floors.find((f) => f.id === currentFloorId);
      if (!floor) return;
      updateFloor(currentFloorId, { rooms: [...floor.rooms, room] });
      return room;
    },
    [currentFloorId, store, updateFloor]
  );

  const updateRoom = useCallback(
    (roomId: string, updates: Partial<Room>) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        rooms: currentFloor.rooms.map((r) =>
          r.id === roomId ? { ...r, ...updates } : r
        ),
      });
    },
    [currentFloor, updateFloor]
  );

  const deleteRoom = useCallback(
    (roomId: string) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        rooms: currentFloor.rooms.filter((r) => r.id !== roomId),
      });
    },
    [currentFloor, updateFloor]
  );

  const moveRoom = useCallback(
    (roomId: string, dx: number, dy: number) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        rooms: currentFloor.rooms.map((r) =>
          r.id === roomId
            ? { ...r, points: r.points.map((p) => ({ x: p.x + dx, y: p.y + dy })) }
            : r
        ),
      });
    },
    [currentFloor, updateFloor]
  );

  const moveRooms = useCallback(
    (roomIds: string[], dx: number, dy: number) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        rooms: currentFloor.rooms.map((r) =>
          roomIds.includes(r.id)
            ? { ...r, points: r.points.map((p) => ({ x: p.x + dx, y: p.y + dy })) }
            : r
        ),
      });
    },
    [currentFloor, updateFloor]
  );

  const moveEntities = useCallback(
    (entityIds: string[], dx: number, dy: number) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        entities: currentFloor.entities.map((e) =>
          entityIds.includes(e.id)
            ? { ...e, x: e.x + dx, y: e.y + dy }
            : e
        ),
      });
    },
    [currentFloor, updateFloor]
  );

  const getAreasForFloor = useCallback(
    (haFloorId: string | null) => {
      if (!haFloorId) return [];
      return haAreas.filter((a) => a.floor_id === haFloorId);
    },
    [haAreas]
  );

  const getEntitiesForArea = useCallback(
    (areaId: string | null) => {
      if (!areaId) return [];
      return entityRegistry.filter((e) => e.area_id === areaId);
    },
    [entityRegistry]
  );

  const addEntity = useCallback(
    (entityId: string, x: number, y: number) => {
      if (!currentFloorId) return;
      const floor = store.floors.find((f) => f.id === currentFloorId);
      if (!floor) return;
      const placement: EntityPlacement = {
        id: generateId(),
        entity_id: entityId,
        x,
        y,
        label_visible: false,
        show_icon: true,
        show_state: false,
      };
      updateFloor(currentFloorId, {
        entities: [...floor.entities, placement],
      });
      return placement;
    },
    [currentFloorId, store, updateFloor]
  );

  const moveEntity = useCallback(
    (placementId: string, x: number, y: number) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        entities: currentFloor.entities.map((e) =>
          e.id === placementId ? { ...e, x, y } : e
        ),
      });
    },
    [currentFloor, updateFloor]
  );

  const updateEntity = useCallback(
    (placementId: string, updates: Partial<EntityPlacement>) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        entities: currentFloor.entities.map((e) =>
          e.id === placementId ? { ...e, ...updates } : e
        ),
      });
    },
    [currentFloor, updateFloor]
  );

  const removeEntity = useCallback(
    (placementId: string) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        entities: currentFloor.entities.filter((e) => e.id !== placementId),
      });
    },
    [currentFloor, updateFloor]
  );

  const addFurniture = useCallback(
    (type: FurnitureType, x: number, y: number, overrides?: Partial<Pick<FurniturePlacement, "width" | "height" | "rotation">>, activeGridSize?: number) => {
      if (!currentFloorId) return;
      const floor = store.floors.find((f) => f.id === currentFloorId);
      if (!floor) return;
      const entry = getCatalogEntry(type);
      const gridSize = activeGridSize && activeGridSize > 0 ? activeGridSize : store.settings.grid_size;
      const w = overrides?.width ?? entry.defaultGridW * gridSize;
      const h = overrides?.height ?? entry.defaultGridH * gridSize;
      // x,y = drop point (grid-snapped center). Offset so top-left corner aligns to grid.
      const snapCornerX = Math.round((x - w / 2) / gridSize) * gridSize + w / 2;
      const snapCornerY = Math.round((y - h / 2) / gridSize) * gridSize + h / 2;
      const placement: FurniturePlacement = {
        id: generateId(),
        type,
        x: snapCornerX,
        y: snapCornerY,
        width: w,
        height: h,
        rotation: overrides?.rotation ?? 0,
      };
      updateFloor(currentFloorId, {
        furniture: [...floor.furniture, placement],
      });
      return placement;
    },
    [currentFloorId, store, updateFloor]
  );

  const moveFurniture = useCallback(
    (id: string, x: number, y: number) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        furniture: currentFloor.furniture.map((f) =>
          f.id === id ? { ...f, x, y } : f
        ),
      });
    },
    [currentFloor, updateFloor]
  );

  const updateFurniture = useCallback(
    (id: string, updates: Partial<FurniturePlacement>) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        furniture: currentFloor.furniture.map((f) =>
          f.id === id ? { ...f, ...updates } : f
        ),
      });
    },
    [currentFloor, updateFloor]
  );

  const removeFurniture = useCallback(
    (id: string) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        furniture: currentFloor.furniture.filter((f) => f.id !== id),
      });
    },
    [currentFloor, updateFloor]
  );

  const moveFurnitureItems = useCallback(
    (ids: string[], dx: number, dy: number) => {
      if (!currentFloor) return;
      updateFloor(currentFloor.id, {
        furniture: currentFloor.furniture.map((f) =>
          ids.includes(f.id) ? { ...f, x: f.x + dx, y: f.y + dy } : f
        ),
      });
    },
    [currentFloor, updateFloor]
  );

  const addFavorite = useCallback(
    (entityId: string, type: FavoriteItem["type"], label: string) => {
      const maxOrder = store.favorites.reduce((max, f) => Math.max(max, f.order), -1);
      const item: FavoriteItem = {
        id: generateId(),
        type,
        entity_id: entityId,
        label,
        icon: "",
        order: maxOrder + 1,
      };
      const newStore = { ...store, favorites: [...store.favorites, item] };
      save(newStore);
    },
    [store, save]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      const newStore = { ...store, favorites: store.favorites.filter((f) => f.id !== id) };
      save(newStore);
    },
    [store, save]
  );

  const updateSettings = useCallback(
    (updates: Partial<GlobalSettings>) => {
      const newStore = {
        ...store,
        settings: { ...store.settings, ...updates },
      };
      save(newStore);
    },
    [store, save]
  );

  return {
    store,
    currentFloor,
    currentFloorId,
    setCurrentFloorId,
    haFloors,
    haAreas,
    getAreasForFloor,
    getEntitiesForArea,
    loaded,
    updateFloor,
    addRoom,
    updateRoom,
    deleteRoom,
    moveRoom,
    moveRooms,
    moveEntities,
    addEntity,
    moveEntity,
    updateEntity,
    removeEntity,
    addFurniture,
    moveFurniture,
    updateFurniture,
    removeFurniture,
    moveFurnitureItems,
    addFavorite,
    removeFavorite,
    updateSettings,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
