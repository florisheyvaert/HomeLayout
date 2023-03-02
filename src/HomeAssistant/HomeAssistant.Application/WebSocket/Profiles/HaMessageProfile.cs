using AutoMapper;
using HomeAssistant.Application.WebSocket.Models;
using HomeAssistant.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.WebSocket.Profiles
{
    internal class HaMessageProfile : Profile
    {
        public HaMessageProfile()
        {
            CreateMap<Message, HaMessage>()
                .ForMember(x => x.Id, o => o.MapFrom(y => y.Id))
                .ForMember(x => x.MessageType, o => o.MapFrom(y => y.Type == MessageType.Event ? HaMessageType.Event : HaMessageType.Result));
        }
    }
}
