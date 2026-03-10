import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .const import DOMAIN


def async_register_commands(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_get_config)
    websocket_api.async_register_command(hass, ws_save_config)


@websocket_api.websocket_command({"type": f"{DOMAIN}/config/get"})
@websocket_api.async_response
async def ws_get_config(hass, connection, msg):
    store = hass.data[DOMAIN]["store"]
    data = await store.async_load()
    connection.send_result(msg["id"], data)


@websocket_api.websocket_command(
    {
        "type": f"{DOMAIN}/config/save",
        vol.Required("config"): dict,
    }
)
@websocket_api.async_response
async def ws_save_config(hass, connection, msg):
    store = hass.data[DOMAIN]["store"]
    await store.async_save(msg["config"])
    connection.send_result(msg["id"], {"success": True})
