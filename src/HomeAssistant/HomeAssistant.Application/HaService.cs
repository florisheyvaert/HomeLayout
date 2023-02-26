using HomeAssistant.Application.Bus;
using HomeAssistant.Application.Bus.Models;
using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application
{
    public static class IdGenerator
    {
        private static int _id;

        public static int Get()
        {
            return ++_id;
        }
    }
    internal class HaService : IHaService
    {
        private readonly Client _bus;
        private static int _id = 1;

        public HaService(Client bus)
        {
            _bus = bus;
        }

        public async Task SetLightState(LightState lightState)
        {
            var command = new Command(lightState.EntityId)
            {
                ServiceData = new
                {
                    brightness = lightState.Brightness
                },
                Type = "call_service",
                Domain = "light",
                Service = "turn_on",
                Id = IdGenerator.Get()
            };

            await _bus.Send(command);
        }
    }
}
