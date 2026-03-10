import type { IconPack, IconEntry } from "../types";

function emoji(value: string, colorMode?: "static" | "entity_rgb"): IconEntry {
  return {
    icon: { type: "emoji", value },
    defaultStyle: { opacity: 1, colorMode: colorMode ?? "static" },
    stateStyles: {
      on: { opacity: 1, colorMode: colorMode ?? "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" },
    },
  };
}

export const emojiPack: IconPack = {
  id: "emoji",
  name: "Emoji",
  description: "Default emoji icons — zero extra bundle size",
  fallback: emoji("⬡"),
  domains: {
    light: {
      default: {
        icon: { type: "emoji", value: "💡" },
        defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
        stateStyles: {
          on: { opacity: 1, colorMode: "entity_rgb" },
          off: { opacity: 0.5, colorMode: "static" },
          unavailable: { opacity: 0.3, colorMode: "static" },
        },
      },
    },
    switch: { default: emoji("⚡") },
    cover: {
      default: emoji("🪟"),
      states: {
        open: emoji("🪟"),
        opening: emoji("🪟"),
        closed: emoji("🪟"),
        closing: emoji("🪟"),
      },
    },
    sensor: {
      default: emoji("📊"),
      deviceClasses: {
        temperature: { default: emoji("🌡") },
        humidity: { default: emoji("💧") },
        pressure: { default: emoji("🌀") },
        power: { default: emoji("⚡") },
        energy: { default: emoji("🔋") },
        battery: { default: emoji("🔋") },
        illuminance: { default: emoji("☀️") },
        carbon_dioxide: { default: emoji("🫧") },
        carbon_monoxide: { default: emoji("⚠️") },
        gas: { default: emoji("🫧") },
        moisture: { default: emoji("💧") },
        plug: { default: emoji("🔌") },
      },
    },
    binary_sensor: {
      default: emoji("◉"),
      deviceClasses: {
        motion: { default: emoji("🚶") },
        door: { default: emoji("🚪") },
        window: { default: emoji("🪟") },
        vibration: { default: emoji("📳") },
        smoke: { default: emoji("🔥") },
        occupancy: { default: emoji("👤") },
        opening: { default: emoji("🚪") },
        presence: { default: emoji("📡") },
        problem: { default: emoji("⚠️") },
        safety: { default: emoji("🛡") },
        sound: { default: emoji("🔊") },
      },
    },
    climate: {
      default: emoji("🌡"),
      states: {
        heat: emoji("🔥"),
        cool: emoji("❄️"),
        heat_cool: emoji("🔄"),
        auto: emoji("🔄"),
        dry: emoji("💧"),
        fan_only: emoji("🌀"),
        off: emoji("⏻"),
      },
    },
    fan: { default: emoji("🌀") },
    camera: { default: emoji("📷") },
    media_player: {
      default: emoji("🔊"),
      states: {
        playing: emoji("▶️"),
        paused: emoji("⏸️"),
      },
    },
    lock: {
      default: emoji("🔒"),
      states: {
        locked: emoji("🔒"),
        unlocked: emoji("🔓"),
      },
    },
    scene: { default: emoji("🎬") },
    script: { default: emoji("📜") },
    automation: { default: emoji("⚙️") },
    button: { default: emoji("🔘") },
    furniture: {
      default: emoji("🪑"),
      deviceClasses: {
        sofa: { default: emoji("🛋️") },
        bed: { default: emoji("🛏️") },
        table: { default: emoji("🪑") },
        chair: { default: emoji("💺") },
        desk: { default: emoji("🖥️") },
        plant: { default: emoji("🪴") },
        door: { default: emoji("🚪") },
        window: { default: emoji("🪟") },
        toilet: { default: emoji("🚽") },
        shower: { default: emoji("🚿") },
        sink: { default: emoji("🚰") },
        bathtub: { default: emoji("🛁") },
        fridge: { default: emoji("🧊") },
        oven: { default: emoji("♨️") },
        dishwasher: { default: emoji("🍽️") },
        tv: { default: emoji("📺") },
        wardrobe: { default: emoji("🗄️") },
        bookshelf: { default: emoji("📚") },
      },
    },
  },
};
