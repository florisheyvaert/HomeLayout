import { Layout } from "./components/Layout";
import type { HomeAssistant } from "./types";

interface AppProps {
  hass: HomeAssistant;
}

export function App({ hass }: AppProps) {
  return <Layout hass={hass} />;
}
