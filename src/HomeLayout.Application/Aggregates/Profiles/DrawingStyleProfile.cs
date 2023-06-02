using AutoMapper;
using HomeLayout.Common.Models;
using HomeLayout.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Application.Aggregates.Profiles
{
    public class DrawingStyleProfile : Profile
    {
        public DrawingStyleProfile()
        {
            CreateMap<DrawingStyle, DrawingStyleModel>()
                .ReverseMap();
        }
    }
}
