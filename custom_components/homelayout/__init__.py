import json
import os

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN, CONF_SET_DEFAULT
from .store import HomeLayoutStorage
from .websocket_api import async_register_commands

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

PANEL_URL = f"/{DOMAIN}_panel"
PANEL_FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "frontend")

# Read version from manifest.json for cache busting
_MANIFEST = os.path.join(os.path.dirname(__file__), "manifest.json")
with open(_MANIFEST, encoding="utf-8") as _f:
    _VERSION = json.load(_f).get("version", "0")


async def _set_default_panel(hass: HomeAssistant, panel_name: str) -> None:
    """Set the system-wide default panel via the frontend system store."""
    system_store = await frontend.async_system_store(hass)
    core_data = system_store.data.get("core") or {}
    await system_store.async_set_item(
        "core", {**core_data, "default_panel": panel_name}
    )


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    store = HomeLayoutStorage(hass)
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["store"] = store

    async_register_commands(hass)

    await hass.http.async_register_static_paths(
        [StaticPathConfig(PANEL_URL, PANEL_FRONTEND_DIR, cache_headers=False)]
    )

    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="homelayout-panel",
        frontend_url_path=DOMAIN,
        sidebar_title="HomeLayout",
        sidebar_icon="mdi:floor-plan",
        module_url=f"{PANEL_URL}/homelayout.js?v={_VERSION}",
        embed_iframe=False,
        require_admin=False,
        config={},
    )

    # Set as default dashboard if configured
    if entry.options.get(CONF_SET_DEFAULT, False):
        await _set_default_panel(hass, DOMAIN)

    # Listen for options updates
    entry.async_on_unload(entry.add_update_listener(_options_update_listener))

    return True


async def _options_update_listener(
    hass: HomeAssistant, entry: ConfigEntry
) -> None:
    """Update default panel when options change."""
    if entry.options.get(CONF_SET_DEFAULT, False):
        await _set_default_panel(hass, DOMAIN)
    else:
        # Restore HA default (lovelace-home or lovelace)
        await _set_default_panel(hass, "lovelace")


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    frontend.async_remove_panel(hass, DOMAIN)
    # Restore default panel if we were the default
    if entry.options.get(CONF_SET_DEFAULT, False):
        await _set_default_panel(hass, "lovelace")
    hass.data.pop(DOMAIN, None)
    return True
