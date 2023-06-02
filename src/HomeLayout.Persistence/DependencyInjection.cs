using HomeLayout.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<IHomeLayoutDbContext, HomeLayoutDbContext>(opts =>
            {
                opts.UseSqlServer(configuration.GetConnectionString("HomeLayout"));
            });

            return services;
        }

        public static IHost MigrateDatabase(this IHost app)
        {
            using var scope = app.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<HomeLayoutDbContext>();
            dbContext.Database.Migrate();

            return app;
        }
    }
}
