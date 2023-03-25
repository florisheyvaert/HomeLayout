using HomeAssistant.Domain;
using HomeAssistant.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Commands.Profiles
{
    internal class SwitchProfile : BaseProfile
    {
        public SwitchProfile()
        {
            CreateMap<SwitchState, HaCommand>()
                .ForMember(x => x.EntityId, o => o.MapFrom(y => y.EntityId))
                .ForMember(x => x.Domain, o => o.MapFrom(y => CommandDomain.Switch))
                .ForMember(x => x.Service, o => o.MapFrom(y => y.Value ? CommandService.TurnOn : CommandService.TurnOff))
                .ForMember(x => x.Data, o => o.MapFrom(y => new Dictionary<string, object>()));
        }
    }
}
