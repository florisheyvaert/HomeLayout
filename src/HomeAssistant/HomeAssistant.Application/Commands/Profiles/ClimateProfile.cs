using HomeAssistant.Domain;
using HomeAssistant.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Commands.Profiles
{
    internal class ClimateProfile : BaseProfile
    {
        public ClimateProfile()
        {
            CreateMap<ClimateState, HaCommand>()
                .ForMember(x => x.EntityId, o => o.MapFrom(y => y.EntityId))
                .ForMember(x => x.Domain, o => o.MapFrom(y => CommandDomain.Climate))
                .ForMember(x => x.Service, o => o.MapFrom(y => Get(y)))
                .ForMember(x => x.Data, o => o.MapFrom(y => CreateData(y)));
        }

        private object CreateData(ClimateState y)
        {
            throw new NotImplementedException();
        }

        private CommandService Get(ClimateState y)
        {
            throw new NotImplementedException();
        }
    }
}
