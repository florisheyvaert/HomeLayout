using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain;
using HomeAssistant.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Commands
{
    internal class CommandHandler : IHaService
    {
        private readonly IHaBus _bus;

        public CommandHandler(IHaBus bus)
        {
            _bus = bus;
        }

        public async Task SetLightState(LightState lightState)
        {
            var command = new HaCommand
            {
                EntityId = lightState.EntityId,
                Domain = CommandDomain.Light,
                Data = new()
                {
                    { "brightness", lightState.Brightness * (decimal)2.56 }
                },
                Service = lightState.State == BasicState.On ? CommandService.TurnOn : CommandService.TurnOff
            };

            if (command.Service == CommandService.TurnOff)
                command.Data = new();

            await _bus.Send(command);
        }
    }
}
