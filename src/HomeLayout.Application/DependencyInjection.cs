using HomeLayout.Application.Aggregates;
using HomeLayout.Application.Clients;
using HomeLayout.Application.Commands;
using HomeLayout.Application.Messages;
using HomeLayout.Application.WebSocket;
using HomeLayout.Common;
using HomeLayout.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Observr;
using System.Reflection;

namespace HomeLayout.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication_Api(this IServiceCollection services, IConfiguration configuration)
        {
            var settings = new AppSettings();
            configuration.GetSection(nameof(AppSettings)).Bind(settings);
            services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));

            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddTransient<IDrawingAggregate, DrawingAggregate>();

            return services;
        }

        public static IServiceCollection AddApplication_Web(this IServiceCollection services, IConfiguration configuration)
        {
            var settings = new AppSettings();
            configuration.GetSection(nameof(AppSettings)).Bind(settings);
            services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));

            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddHttpClient<IDrawingAggregate, DrawingClient>(WireUpClient(settings));

            return services;
        }

        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            var settings = new AppSettings();
            configuration.GetSection(nameof(AppSettings)).Bind(settings);
            services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));

            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddObservr();

            services.AddHttpClient("ha", o =>
            {
                o.BaseAddress = new Uri(settings.HomeLayoutWebApiUrl);
                o.DefaultRequestHeaders.Add("Authorization", $"Bearer {settings.HomeLayoutAccessToken}");
            });

            services.AddSingleton<IHaBus, WebSocketBus>();
            services.AddHostedService<EventPublisher>();
            services.AddTransient<IHaService, HaService>();
            services.AddTransient<MessageHandler>();

            return services;
        }

        private static Action<HttpClient> WireUpClient(AppSettings settings)
        {
            return x =>
            {
                x.BaseAddress = new Uri(settings.HomeLayoutApiUrl);
            };
        }
    }
}
