using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Persistence
{
    // add migration: dotnet ef --startup-project ../HomeAssistant.Api/ migrations add AddDrawing
    public class HomeAssistantDbContext : DbContext, IHomeAssistantDbContext
    {
        public DbSet<Drawing> Drawing { get; set; }
        public DbSet<DrawingStyle> DrawingStyle { get; set; }

        public HomeAssistantDbContext(DbContextOptions<HomeAssistantDbContext> options) : base(options)
        {

        }
    }
}
