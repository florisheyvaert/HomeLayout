# Vacuum Map Camera Overlay

## Context

De gebruiker heeft een Roborock stofzuiger (cloud integratie) en wil deze zien rondrijden op de HomeLayout plattegrond. De Roborock integratie biedt een camera-entity met een live kaartbeeld waarop de robot zichtbaar is. We leggen dit kaartbeeld semi-transparant over het canvas zodat de robot zichtbaar is terwijl hij schoonmaakt.

## Aanpak

Het vacuüm-kaartbeeld wordt als een positioneerbare, schaalbare overlay op het canvas gerenderd. De gebruiker lijnt het eenmalig uit met zijn getekende kamers (drag + resize in edit mode). Tijdens het schoonmaken wordt het beeld snel gepolld (elke 3s) zodat de bewegende robot zichtbaar is.

## Implementatie

### 1. Extend `EntityPlacement` type
**File:** `frontend/src/types/index.ts`

Voeg optionele velden toe aan `EntityPlacement`:
```typescript
/** Vacuum map overlay: entity_id of the camera entity showing the vacuum map */
vacuum_map_entity_id?: string;
/** Vacuum map overlay: transform to align map image on canvas */
vacuum_map_transform?: {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;  // 0.1–0.8, default 0.3
};
```

Geen breaking changes — alles optioneel, wordt alleen gebruikt voor vacuum-domain entities.

### 2. Create `useVacuumMap` hook
**New file:** `frontend/src/hooks/useVacuumMap.ts`

Hergebruikt het patroon van `useCameraThumbnail.ts` (double-buffering, cache-busting timestamp):
- **Input:** `entityPictureUrl`, `isActive` (vacuum is cleaning), `enabled`
- **Polling rate:** 3s wanneer actief (cleaning), 30s wanneer idle/docked
- **Output:** `{ image, hasError, refresh }`

Dit is bewust een apart hook (niet hergebruik van `useCameraThumbnail`) omdat de adaptieve polling rate specifiek is voor vacuum.

### 3. Create `VacuumMapOverlay` canvas component
**New file:** `frontend/src/components/canvas/VacuumMapOverlay.tsx`

Konva component dat per vacuum-entity met een geconfigureerde map overlay:
- Rendert het kaartbeeld als `Konva.Image` met position/size uit `vacuum_map_transform`
- Semi-transparant (configurable opacity)
- **View mode:** non-interactive (`listening={false}`)
- **Edit mode + vacuum geselecteerd:** draggable + resize handles op hoeken
  - Drag → update `vacuum_map_transform.x/y`
  - Corner handles → update `width/height` (proportional resize)
- Counter-rotate met `stageRotation` zodat het beeld altijd goed georiënteerd is

### 4. Insert layer in `HomeLayoutCanvas.tsx`
**File:** `frontend/src/components/canvas/HomeLayoutCanvas.tsx`

Voeg een nieuwe `<Layer>` toe **tussen de Room-layer en de Furniture-layer** (regel ~978-979):

```
Grid → Ghost → Rooms+Badges → **VacuumMapOverlay** → Furniture → Entities
```

Dit zorgt ervoor dat:
- Kamers zichtbaar zijn onder de overlay (overlay is semi-transparant)
- Entity markers boven de overlay staan (je ziet nog steeds je lampen etc.)
- Furniture boven de overlay staat

Props: alle vacuum entities van de huidige floor die `vacuum_map_entity_id` hebben + `hass` + edit state.

### 5. Vacuum map configuratie UI in `EntityControl.tsx`
**File:** `frontend/src/components/sidebar/EntityControl.tsx`

Wanneer `domain === "vacuum"` en `isEditMode`, toon extra sectie:

1. **"Show vacuum map" toggle** — schakelt de overlay aan/uit
2. **"Map camera" dropdown** — kies welke camera-entity het kaartbeeld levert
   - Auto-detectie: zoek camera-entities met dezelfde `device_id` als de vacuum (via `entityRegistry`)
   - Fallback: toon alle camera-entities als dropdown
3. **"Map opacity" slider** — 0.1 tot 0.6 (default 0.3)
4. **Instructietekst:** "Drag and resize the map overlay on the canvas to align with your rooms"

### 6. Auto-detect vacuum map camera
**In `EntityControl.tsx` of helper functie**

Logica voor auto-detectie van de bijbehorende camera:
- Gebruik `entityRegistry` (al beschikbaar in `useHomeLayout`)
- Zoek de `device_id` van de vacuum entity
- Zoek camera-entities met dezelfde `device_id`
- Roborock registreert typisch `camera.roborock_map` onder hetzelfde device

### 7. Persistence

Geen nieuwe persistence code nodig. `vacuum_map_entity_id` en `vacuum_map_transform` zitten in `EntityPlacement`, dat al via de bestaande `updateEntity()` → debounced save pipeline wordt opgeslagen.

## Bestanden overzicht

| Actie | Bestand |
|-------|---------|
| **Nieuw** | `frontend/src/hooks/useVacuumMap.ts` |
| **Nieuw** | `frontend/src/components/canvas/VacuumMapOverlay.tsx` |
| **Edit** | `frontend/src/types/index.ts` — velden toevoegen aan `EntityPlacement` |
| **Edit** | `frontend/src/components/canvas/HomeLayoutCanvas.tsx` — layer toevoegen + props doorgeven |
| **Edit** | `frontend/src/components/sidebar/EntityControl.tsx` — vacuum map config UI |

## Verificatie

1. `npm run dev` — dev server starten
2. Voeg een vacuum entity toe aan het canvas
3. Selecteer de vacuum → open EntityControl drawer
4. Schakel "Show vacuum map" in, selecteer de map camera entity
5. Controleer dat het kaartbeeld als overlay op het canvas verschijnt
6. In edit mode: drag de overlay om uit te lijnen met de kamers, resize via hoeken
7. In view mode: controleer dat de overlay niet interactief is maar wel zichtbaar
8. Verander de vacuum state naar "cleaning" → controleer snellere polling (3s vs 30s)
9. `npm run build` — controleer geen TypeScript errors
