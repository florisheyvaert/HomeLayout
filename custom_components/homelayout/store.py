from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION

DEFAULT_DATA = {
    "version": 1,
    "floors": [],
    "favorites": [],
    "settings": {
        "default_floor_id": None,
        "grid_enabled": True,
        "grid_size": 20,
        "show_entity_labels": True,
    },
}


class HomeLayoutStorage:
    def __init__(self, hass: HomeAssistant) -> None:
        self._store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._data: dict | None = None

    async def async_load(self) -> dict:
        self._data = await self._store.async_load()
        if self._data is None:
            self._data = dict(DEFAULT_DATA)
        return self._data

    async def async_save(self, data: dict) -> None:
        self._data = data
        await self._store.async_save(data)
