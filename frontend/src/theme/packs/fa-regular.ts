import {
  faLightbulb as faLightbulbReg,
  faWindowMaximize as faWindowMaximizeReg,
  faEye as faEyeReg,
  faBell as faBellReg,
  faSnowflake as faSnowflakeReg,
  faSun as faSunReg,
  faChartBar as faChartBarReg,
  faCirclePlay,
  faCirclePause,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBolt,
  faTemperatureHigh,
  faDroplet,
  faGaugeHigh,
  faPlug,
  faBatteryFull,
  faSmog,
  faWater,
  faPersonWalking,
  faDoorOpen,
  faDoorClosed,
  faFan,
  faCamera,
  faLock,
  faLockOpen,
  faFire,
  faArrowsRotate,
  faPowerOff,
  faWind,
  faShieldHalved,
  faTriangleExclamation,
  faUserGroup,
  faSatelliteDish,
  faTv,
  faToggleOn,
  faToggleOff,
  faBoltLightning,
  faMicrophone,
  faFilm,
  faFileCode,
  faGear,
  faCircleDot,
  faChair,
  faCouch,
  faBed,
  faSeedling,
  faToilet,
  faShower,
  faSink,
  faBath,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import type { IconPack, IconEntry, IconStateStyle, IconData } from "../types";

function faIcon(def: IconDefinition): IconData {
  return {
    type: "path",
    value: def.icon[4] as string,
    viewBox: { w: def.icon[0], h: def.icon[1] },
  };
}

function fa(
  def: IconDefinition,
  opts?: { stateStyles?: Record<string, IconStateStyle>; defaultStyle?: IconStateStyle },
): IconEntry {
  return {
    icon: faIcon(def),
    defaultStyle: opts?.defaultStyle ?? { opacity: 1, colorMode: "static" },
    stateStyles: opts?.stateStyles ?? {
      on: { opacity: 1, colorMode: "static" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
      unknown: { opacity: 0.3, colorMode: "static" },
    },
  };
}

function faLight(def: IconDefinition): IconEntry {
  return {
    icon: faIcon(def),
    defaultStyle: { opacity: 1, colorMode: "entity_rgb" },
    stateStyles: {
      on: { opacity: 1, colorMode: "entity_rgb" },
      off: { opacity: 0.5, colorMode: "static" },
      unavailable: { opacity: 0.3, colorMode: "static" },
    },
  };
}

export const faRegularPack: IconPack = {
  id: "fa-regular",
  name: "Font Awesome Light",
  description: "Font Awesome outline icons — clean, lighter weight",
  fallback: fa(faShieldHalved),
  domains: {
    light: {
      default: faLight(faLightbulbReg),
    },
    switch: {
      default: fa(faToggleOn),
      states: {
        on: fa(faToggleOn),
        off: fa(faToggleOff),
      },
    },
    cover: {
      default: fa(faWindowMaximizeReg),
    },
    sensor: {
      default: fa(faChartBarReg),
      deviceClasses: {
        temperature: { default: fa(faTemperatureHigh) },
        humidity: { default: fa(faDroplet) },
        pressure: { default: fa(faGaugeHigh) },
        power: { default: fa(faBolt) },
        energy: { default: fa(faBoltLightning) },
        battery: { default: fa(faBatteryFull) },
        illuminance: { default: fa(faSunReg) },
        carbon_dioxide: { default: fa(faSmog) },
        carbon_monoxide: { default: fa(faTriangleExclamation) },
        gas: { default: fa(faSmog) },
        moisture: { default: fa(faWater) },
        plug: { default: fa(faPlug) },
      },
    },
    binary_sensor: {
      default: fa(faEyeReg),
      deviceClasses: {
        motion: { default: fa(faPersonWalking) },
        door: {
          default: fa(faDoorClosed),
          states: { on: fa(faDoorOpen), off: fa(faDoorClosed) },
        },
        window: { default: fa(faWindowMaximizeReg) },
        vibration: { default: fa(faBellReg) },
        smoke: { default: fa(faFire) },
        occupancy: { default: fa(faUserGroup) },
        opening: {
          default: fa(faDoorClosed),
          states: { on: fa(faDoorOpen), off: fa(faDoorClosed) },
        },
        presence: { default: fa(faSatelliteDish) },
        problem: { default: fa(faTriangleExclamation) },
        safety: { default: fa(faShieldHalved) },
        sound: { default: fa(faMicrophone) },
      },
    },
    climate: {
      default: fa(faTemperatureHigh),
      states: {
        heat: fa(faFire),
        cool: fa(faSnowflakeReg),
        heat_cool: fa(faArrowsRotate),
        auto: fa(faArrowsRotate),
        dry: fa(faDroplet),
        fan_only: fa(faFan),
        off: fa(faPowerOff),
      },
    },
    fan: {
      default: fa(faFan),
      states: {
        on: fa(faFan),
        off: fa(faWind),
      },
    },
    camera: { default: fa(faCamera) },
    media_player: {
      default: fa(faTv),
      states: {
        playing: fa(faCirclePlay),
        paused: fa(faCirclePause),
      },
    },
    lock: {
      default: fa(faLock),
      states: {
        locked: fa(faLock),
        unlocked: fa(faLockOpen),
      },
    },
    scene: { default: fa(faFilm) },
    script: { default: fa(faFileCode) },
    automation: { default: fa(faGear) },
    button: { default: fa(faCircleDot) },
    furniture: {
      default: fa(faChair),
      deviceClasses: {
        sofa: { default: fa(faCouch) },
        bed: { default: fa(faBed) },
        table: { default: fa(faChair) },
        chair: { default: fa(faChair) },
        desk: { default: fa(faChair) },
        plant: { default: fa(faSeedling) },
        door: { default: fa(faDoorOpen) },
        window: { default: fa(faChair) },
        toilet: { default: fa(faToilet) },
        shower: { default: fa(faShower) },
        sink: { default: fa(faSink) },
        bathtub: { default: fa(faBath) },
        fridge: { default: fa(faChair) },
        oven: { default: fa(faChair) },
        dishwasher: { default: fa(faChair) },
        tv: { default: fa(faTv) },
        wardrobe: { default: fa(faChair) },
        bookshelf: { default: fa(faBook) },
      },
    },
  },
};
