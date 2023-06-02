using AutoMapper;
using HomeLayout.Application.WebSocket.Models;
using HomeLayout.Domain;
using HomeLayout.Domain.States;
using System;
using System.Collections.Generic;
using System.IO.MemoryMappedFiles;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Application.WebSocket.Profiles
{
    internal class HaStateChangedMessageProfile : Profile
    {
        public HaStateChangedMessageProfile()
        {
            CreateMap<Message, HaStateChangedMessage>()
                .ForMember(x => x.MessageType, o => o.MapFrom(y => y.Type == MessageType.Event ? HaMessageType.Event : HaMessageType.Result))
                .ForMember(x => x.EntityId, o => o.MapFrom(y => y.Event.Data.EntityId))
                .ForMember(x => x.TimeFired, o => o.MapFrom(y => y.Event.TimeFired))
                .ForMember(x => x.NewState, o => o.MapFrom(y => y.Event.Data.NewState))
                .ForMember(x => x.OldState, o => o.MapFrom(y => y.Event.Data.OldState));
           
        }
    }
}
