# HomeLayout for Home Assistant

A visual home layout editor that lets you place and control your Home Assistant entities on an interactive map of your home.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1+-blue)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange)](https://hacs.xyz)

## Features

- Drag-and-drop entity placement on a canvas
- Draw rooms with custom shapes
- Place furniture from a built-in catalog
- Control lights, switches, covers, climate and more directly from the floor plan
- Multiple floor support
- Customizable icon packs (MDI, FontAwesome, Heroicons, Phosphor, Bootstrap Icons, Emoji)
- Color theme presets
- Responsive: works on desktop and mobile
- Pan, zoom, and rotate the view

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click the three dots in the top right corner and select **Custom repositories**
3. Add this repository URL and select **Integration** as the category
4. Click **Download**
5. Restart Home Assistant
6. Go to **Settings → Devices & Services → Add Integration** and search for **HomeLayout**

### Manual

1. Download the latest release zip from the [Releases](../../releases) page
2. Extract the `homelayout` folder into your `custom_components/` directory
3. Restart Home Assistant
4. Go to **Settings → Devices & Services → Add Integration** and search for **HomeLayout**

## Usage

After installation, a **HomeLayout** item appears in your sidebar. Click it to open the editor.

- **View mode**: Click entities to control them (toggle lights, adjust climate, etc.)
- **Edit mode**: Click the edit button to enter design mode where you can:
  - Draw rooms
  - Place entities from the entity browser
  - Add furniture
  - Rearrange and resize elements

## Development

```bash
cd frontend
npm install
npm run dev
```

The dev server runs a standalone version with mock data. To build for production:

```bash
npm run build
```

This outputs the panel JS to `custom_components/homelayout/frontend/`.
