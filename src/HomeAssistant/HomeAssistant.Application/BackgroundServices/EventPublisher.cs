using HomeAssistant.Common.Interfaces;
using Microsoft.Extensions.Hosting;
using Observr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.BackgroundServices
{
    internal class EventPublisher : BackgroundService
    {
        private readonly IHaBus _bus;
        private readonly IBroker _broker;

        public EventPublisher(
            IHaBus bus
            , IBroker broker
        )
        {
            _bus = bus;
            _broker = broker;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var message = await _bus.Receive();
                await _broker.Publish(message);
            }
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await _bus.DisposeAsync();
            await base.StopAsync(cancellationToken);
        }
    }
}
