using AutoMapper;
using HomeAssistant.Common.Models;
using HomeAssistant.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Aggregates.Profiles
{
    public class DrawingProfile : Profile
    {
        public DrawingProfile()
        {
            CreateMap<Drawing, DrawingModel>()
                .ReverseMap();
        }
    }
}
