using AutoMapper;
using HomeAssistant.Application.WebSocket.Models;
using HomeAssistant.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.WebSocket.Profiles
{
    internal class BaseStateProfile : Profile
    {
        public BaseStateProfile()
        {
            CreateMap<State, BaseState>()
                .ForMember(x => x.EntityId, o => o.MapFrom(y => y.EntityId))
                .ForMember(x => x.Attributes, o => o.MapFrom(y => y.Attributes))
                .ForMember(x => x.State, o => o.MapFrom(y => y.Value == "off" ? BasicState.Off : BasicState.On));
        }
    }
}
