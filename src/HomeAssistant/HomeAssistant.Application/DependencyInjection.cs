using HomeAssistant.Application.Commands;
using HomeAssistant.Application.Messages;
using HomeAssistant.Application.WebSocket;
using HomeAssistant.Common;
using HomeAssistant.Common.Interfaces;
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

            services.AddSingleton<IHaBus, WebSocketBus>();
            services.AddHostedService<EventPublisher>();
            services.AddTransient<IHaService, CommandHandler>();
            services.AddTransient<MessageHandler>();

            //services.AddTransient<EventStrategy>();

            return services;
        }
    }
}
