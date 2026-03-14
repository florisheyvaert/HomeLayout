import voluptuous as vol
from homeassistant import config_entries

from .const import DOMAIN, CONF_SET_DEFAULT


class HomeLayoutConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(title="HomeLayout", data={})

        return self.async_show_form(step_id="user")

    @staticmethod
    def async_get_options_flow(config_entry):
        return HomeLayoutOptionsFlow(config_entry)


class HomeLayoutOptionsFlow(config_entries.OptionsFlow):
    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        self.config_entry = config_entry

    async def async_step_init(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        current = self.config_entry.options.get(CONF_SET_DEFAULT, False)

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Optional(CONF_SET_DEFAULT, default=current): bool,
                }
            ),
        )
