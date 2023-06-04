using HomeLayout.Common.Interfaces;
using HomeLayout.Common.Static;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Drawing>().HasOne(x => x.Style).WithMany(x => x.Drawings).HasForeignKey(x => x.StyleId);

            base.OnModelCreating(modelBuilder);
        }

        public void SeedData()
        {
            if (!DrawingStyle.Any())
            {
                DrawingStyle.AddRange(new List<DrawingStyle>()
                {
                    new()
                    {
                        FillColor = "#F00",
                        StrokeWidth = 1,
                        StrokeColor = "#FF0",
                        Name = DrawingStyles.InnerWall
                    },
                    new()
                    {
                        FillColor = "#FF0",
                        StrokeWidth = 1,
                        StrokeColor = "#0F0",
                        Name = DrawingStyles.OuterWall
                    }
                });
            }

            SaveChanges();
        }
    }
}
