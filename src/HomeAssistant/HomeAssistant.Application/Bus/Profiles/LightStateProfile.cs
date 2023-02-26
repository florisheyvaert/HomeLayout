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
    internal class LightStateProfile : Profile
    {
        public LightStateProfile()
        {
            CreateMap<State, LightState>()
                .ForMember(x => x.EntityId, o => o.MapFrom(y => y.EntityId))
                .ForMember(x => x.ChangedAt, o => o.MapFrom(y => y.LastChanged))
                .ForMember(x => x.Value, o => o.MapFrom(y => y.Value))
                .ForMember(x => x.Brightness, o => o.MapFrom(y => GetDecimal(y.Attributes.FirstOrDefault(x => x.Key == "brightness"))))
                .ForMember(x => x.FriendlyName, o => o.MapFrom(y => GetString(y.Attributes.FirstOrDefault(x => x.Key == "friendly_name"))));
        }

        private string GetString(KeyValuePair<string, object> value)
        {
            return value.Value?.ToString() ?? string.Empty;
        }

        private decimal GetDecimal(KeyValuePair<string, object> value)
        {
            if (decimal.TryParse(value.Value?.ToString(), out var output))
                return output;
            else
                return 0;
        }
    }
}
