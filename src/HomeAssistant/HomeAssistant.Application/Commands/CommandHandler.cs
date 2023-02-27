using AutoMapper;
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
        private readonly IMapper _mapper;

        public CommandHandler(
            IHaBus bus,
            IMapper mapper
        )
        {
            _bus = bus;
            _mapper = mapper;
        }

        public async Task SetState<TE>(TE state) where TE : BaseState
        {
            var command = _mapper.Map<HaCommand>(state);
            await _bus.Send(command);
        }
    }
}
