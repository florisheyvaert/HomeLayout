# HomeLayout

## Release Build

To create a release build, push a git tag. The GitHub Action (`.github/workflows/release.yml`) will automatically build the frontend and create a GitHub Release with a zip.

```bash
# 1. Commit and push your changes normally
git add .
git commit -m "your changes"
git push

# 2. Tag the commit and push the tag to trigger a release build
git tag v0.1.0
git push origin v0.1.0
```

A normal `git push` only pushes code — it does NOT trigger a release. Only pushing a tag (`git push origin v<version>`) triggers the release workflow.

## Project Structure

- `frontend/` — React + Konva canvas app (Vite, Tailwind)
- `custom_components/homelayout/` — HA integration (Python)

### Frontend Structure

- `frontend/src/hooks/useHomeLayout.ts` — Main state management, CRUD for floors/rooms/entities, debounced save
- `frontend/src/components/Layout.tsx` — Root layout: full-screen canvas + floating overlay controls + bottom sheet
- `frontend/src/components/BottomSheet.tsx` — Draggable bottom panel with snap points
- `frontend/src/components/canvas/` — Konva canvas components (HomeLayoutCanvas, RoomLayer, EntityLayer, EntityMarker, GridLayer)
- `frontend/src/components/sidebar/` — Panel content (ControlPanel, RoomEditor, EntityBrowser, EntityControl, AppearanceSettings)
- `frontend/src/types/index.ts` — All TypeScript interfaces
- `frontend/src/theme/` — Theme & icon pack system
  - `types.ts` — IconPack, ThemeConfig, IconEntry interfaces
  - `colors.ts` — Theme presets (default, warm-amber, cool-ocean, pastel, monochrome) + font presets
  - `resolveIcon.ts` — Pure function: resolves domain+state+deviceClass → icon+style
  - `ThemeContext.tsx` — React context providing theme colors + icon resolution
  - `KonvaIcon.tsx` — Canvas renderer (emoji=Text, path=Path)
  - `DomIcon.tsx` — DOM renderer (emoji=span, path=svg)
  - `packs/` — 11 icon packs from 5 libraries (emoji, mdi×5, fa×2, bootstrap, heroicons, phosphor)

## Build

```bash
cd frontend
npm install
npm run dev    # dev server with mock data
npm run build  # production build → custom_components/homelayout/frontend/
```

## Distribution

- Users install via HACS (custom repository) or manually from GitHub Releases
- `hacs.json` is configured with `zip_release: true` — HACS downloads the built zip from releases
- `.github/workflows/validate.yml` runs HACS + Hassfest validation on every push/PR to main

## Konva Drag Patterns

**IMPORTANT: Two different drag patterns exist in this codebase. Do NOT mix them up.**

### Pattern 1: Group without x/y (Rooms)
Used by `RoomLayer.tsx` — the Group has NO `x`/`y` props. Child shapes use absolute coordinates.
- `e.target.x()` after drag = **delta** (offset from origin)
- `onDragEnd`: use `e.target.x()` as delta, then reset position to `{x: 0, y: 0}`
- Example: `onMoveRoom(id, snapToGrid(e.target.x(), ...), snapToGrid(e.target.y(), ...))`

### Pattern 2: Group with x/y (Entity Markers)
Used by `EntityMarker.tsx` — the Group has `x={placement.x} y={placement.y}`.
- `e.target.x()` after drag = **new absolute position** (Konva mutates x/y directly)
- `onDragEnd`: use `e.target.x()` directly as the new position. Do NOT add `placement.x` to it. Do NOT reset position to 0.
- Example: `onMove(id, snapToGrid(e.target.x(), ...), snapToGrid(e.target.y(), ...))`

### Common mistake
```typescript
// WRONG — double-counts the position
onMove(id, placement.x + e.target.x(), placement.y + e.target.y())

// CORRECT — e.target.x() is already the absolute position
onMove(id, e.target.x(), e.target.y())
```

## UI Architecture (Google Maps-style)

The app uses a full-screen canvas with floating overlay controls — no sidebar.

- **Canvas**: Fills entire viewport (`100vw × 100vh`), supports rotation (0/90/180/270°)
- **Floating overlays** (pointer-events: none container, z-index 10):
  - Top-left: Floor switcher (horizontal pills)
  - Top-right: Settings gear + Edit/Done button
  - Left-center: Edit tools (draw, place, grid, undo/redo) — edit mode only, shifts right when drawer is open
  - Right-bottom: Rotate + Reset view (conditional) + Zoom in/out
  - Bottom-left: Logo placeholder
- **Responsive panel** (`useIsMobile` at 768px breakpoint):
  - **Desktop (≥768px)**: `SideDrawer` — left-side drawer (360px, slides in/out, glass morphism)
  - **Mobile (<768px)**: `BottomSheet` — draggable bottom panel with snap points (hidden/peek/half/full)
- **HomeLayoutCanvas**: Uses `forwardRef` + `useImperativeHandle` to expose `zoomIn/zoomOut/resetView/rotateView`
- **ControlPanel**: No wrapper div — just returns content; drawer/sheet provides the container
- **Viewport state**: `x`, `y`, `scale`, `r` (rotation) persisted in URL query params via `history.replaceState`
- **Toolbar.tsx**: DEAD CODE (superseded by floating controls in Layout.tsx)

## Conventions

- All UI text in English
- No room colors — consistent styling (dark: #2a2a2a fill / #888 stroke, light: #e8e8e8 fill / #000 stroke)
- Left-click drag (or touch drag) on empty canvas to pan, scroll wheel or pinch to zoom
- Grid snapping happens during drag (onDragMove), not just on drop
- Entity labels default to hidden (`label_visible: false`)
- Entity markers are icon-only (no background circle)
- Brand color (`BRAND = "#00bf63"`) for all UI accents (selection rings, buttons, borders)
- Entity colors are per-domain via `getDomainColor(domain)` from `useThemeConfig()` — configurable via color theme presets
- ThemeColors has per-domain fields: `light`, `switch`, `sensor`, `climate_heating`, `climate_cooling`, `cover`, `lock`, `media_player`, `fan`, `vacuum`, `automation`, `camera`, `fallback`
- Icon resolution cascade: deviceClass+state → deviceClass → domain+state → domain → fallback
- `hexToRgba()` helper is duplicated in files that need it (no shared util to avoid import overhead)

## Plans

When creating a plan, always save it inside the repo (e.g. `plans/` folder in the project root) so it stays with the codebase and is easy to find later. Do NOT rely solely on `~/.claude/plans/` — those are disconnected from the project and hard to trace back.
