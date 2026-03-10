import { createRoot, Root } from "react-dom/client";
import { App } from "./App";
import type { HomeAssistant } from "./types";
import styles from "./styles.css?inline";

class HomeLayoutPanel extends HTMLElement {
  private _root: Root | null = null;
  private _hass: HomeAssistant | null = null;

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._render();
  }

  set panel(_panel: unknown) {
    // Panel config - not used currently
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    // Inject Tailwind styles into shadow DOM
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    shadow.appendChild(styleEl);

    const container = document.createElement("div");
    container.id = "root";
    container.style.height = "100%";
    shadow.appendChild(container);

    this._root = createRoot(container);
    this._render();
  }

  disconnectedCallback() {
    this._root?.unmount();
    this._root = null;
  }

  private _render() {
    if (!this._root || !this._hass) return;
    this._root.render(<App hass={this._hass} />);
  }
}

customElements.define("homelayout-panel", HomeLayoutPanel);
