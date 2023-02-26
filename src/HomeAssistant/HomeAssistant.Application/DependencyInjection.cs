using HomeAssistant.Application.Bus;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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

            services.AddHostedService<HostedBackgroundService>();
            services.AddSingleton<Client>();
            services.AddTransient<Handler>();

            return services;
        }
    }
}
