using HomeAssistant.Domain.States;
using HomeAssistant.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Commands.Profiles
{
    internal class CoverProfile : BaseProfile
    {
        public CoverProfile()
        {
            CreateMap<CoverState, HaCommand>()
                .ForMember(x => x.EntityId, o => o.MapFrom(y => y.EntityId))
                .ForMember(x => x.Domain, o => o.MapFrom(y => CommandDomain.Cover))
                .ForMember(x => x.Service, o => o.MapFrom(y => Get(y)))
                .ForMember(x => x.Data, o => o.MapFrom(y => CreateData(y)));
        }

        private Dictionary<string, object> CreateData(CoverState state)
        {
            return state.Position == 0 ? new() : new()
            {
                {  "position", state.Position }
            };
        }

        private CommandService Get(CoverState state)
        {
            if (state.Position != 0)
                return CommandService.SetCoverPosition;
            else
                return state.State == BasicState.On ? CommandService.OpenCover : CommandService.CloseCover;
        }
    }
}
