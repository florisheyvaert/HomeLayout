/**
 * Development harness - niet meegebundeld in productie.
 * Maakt een standalone verbinding met HA voor lokaal ontwikkelen.
 *
 * Gebruik:
 *   1. Maak een long-lived access token aan in HA (Profiel → Long-Lived Access Tokens)
 *   2. Vul HA_URL en HA_TOKEN hieronder in
 *   3. `npm run dev` → open http://localhost:5173
 */
import { createRoot } from "react-dom/client";
import {
  createConnection,
  createLongLivedTokenAuth,
  subscribeEntities,
  callService,
  HassEntities,
} from "home-assistant-js-websocket";
import { App } from "./App";
import type { HomeAssistant } from "./types";
import "./styles.css";

const HA_URL = import.meta.env.VITE_HA_URL ?? "http://localhost:8123";
const HA_TOKEN = import.meta.env.VITE_HA_TOKEN ?? "";

async function main() {
  const auth = createLongLivedTokenAuth(HA_URL, HA_TOKEN);
  const connection = await createConnection({ auth });

  const hass: HomeAssistant = {
    states: {},
    callService: async (domain, service, data, target) => {
      await callService(connection, domain, service, data, target);
    },
    callWS: async <T,>(msg: Record<string, unknown>): Promise<T> => {
      return connection.sendMessagePromise(msg as { type: string }) as Promise<T>;
    },
  };

  const root = createRoot(document.getElementById("root")!);

  subscribeEntities(connection, (entities: HassEntities) => {
    hass.states = entities as unknown as typeof hass.states;
    root.render(<App hass={hass} />);
  });

  // Initial render
  root.render(<App hass={hass} />);
}

main().catch(console.error);
