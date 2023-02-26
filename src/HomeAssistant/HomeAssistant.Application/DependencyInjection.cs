using HomeAssistant.Application.Bus;
using HomeAssistant.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Observr;
using System.Reflection;

namespace HomeAssistant.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddObservr();
            services.Configure<AppSettings>(o => configuration.GetSection("AppSettings"));

            services.AddHostedService<HostedBackgroundService>();
            services.AddSingleton<Client>();
            services.AddTransient<Bus.EventHandler>();

            return services;
        }
    }
}
