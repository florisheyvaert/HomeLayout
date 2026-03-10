import os

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .store import HomeLayoutStorage
from .websocket_api import async_register_commands

PANEL_URL = f"/{DOMAIN}_panel"
PANEL_FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "frontend")


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    store = HomeLayoutStorage(hass)
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["store"] = store

    async_register_commands(hass)

    await hass.http.async_register_static_paths(
        [StaticPathConfig(PANEL_URL, PANEL_FRONTEND_DIR, cache_headers=True)]
    )

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="homelayout-panel",
        frontend_url_path=DOMAIN,
        sidebar_title="HomeLayout",
        sidebar_icon="mdi:floor-plan",
        module_url=f"{PANEL_URL}/homelayout.js",
        embed_iframe=False,
        require_admin=False,
        config={},
    )

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    frontend.async_remove_panel(hass, DOMAIN)
    hass.data.pop(DOMAIN, None)
    return True
