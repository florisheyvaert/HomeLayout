using HomeLayout.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Common.Interfaces
{
    public interface IHomeLayoutDbContext
    {
        DbSet<Drawing> Drawing { get; set; }
        DbSet<DrawingStyle> DrawingStyle { get; set; }

        void SeedData();

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
