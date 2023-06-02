using HomeLayout.Common.Interfaces;
using HomeLayout.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Persistence
{
    // add migration: dotnet ef --startup-project ../HomeLayout.Api/ migrations add AddDrawing
    // update: dotnet ef --startup-project ../HomeLayout.Api/ database update
    public class HomeLayoutDbContext : DbContext, IHomeLayoutDbContext
    {
        public DbSet<Drawing> Drawing { get; set; }
        public DbSet<DrawingStyle> DrawingStyle { get; set; }

        public HomeLayoutDbContext(DbContextOptions<HomeLayoutDbContext> options) : base(options)
        {

        }
    }
}
