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
            var settings = new AppSettings();
            configuration.GetSection(nameof(AppSettings)).Bind(settings);
            services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));

            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddObservr();

            services.AddHttpClient("ha", o =>
            {
                o.BaseAddress = new Uri(settings.HomeAssistantWebApiUrl);
                o.DefaultRequestHeaders.Add("Authorization", $"Bearer {settings.HomeAssistantAccessToken}");
            });

            services.AddSingleton<IHaBus, WebSocketBus>();
            services.AddHostedService<EventPublisher>();
            services.AddTransient<IHaService, CommandHandler>();
            services.AddTransient<MessageHandler>();

            return services;
        }
    }
}
