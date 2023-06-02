using HomeAssistant.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Common.Interfaces
{
    public interface IHomeAssistantDbContext
    {
        DbSet<Drawing> Drawing { get; set; }
        DbSet<DrawingStyle> DrawingStyle { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
