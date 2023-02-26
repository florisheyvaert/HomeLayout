using AutoMapper;
using HomeAssistant.Application.Bus.Models;
using HomeAssistant.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Bus.Profiles
{
    internal class SwitchStateProfile : BaseProfile
    {
        public SwitchStateProfile()
        {
            CreateMap<State, SwitchState>()
                .ForMember(x => x.EntityId, o => o.MapFrom(y => y.EntityId))
                .ForMember(x => x.ChangedAt, o => o.MapFrom(y => y.LastChanged))
                .ForMember(x => x.Value, o => o.MapFrom(y => y.Value))
                .ForMember(x => x.FriendlyName, o => o.MapFrom(y => GetString(y.Attributes.FirstOrDefault(x => x.Key == "friendly_name"))));
        }
    }
}
