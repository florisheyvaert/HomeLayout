using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain;
using Microsoft.Extensions.Hosting;
using Observr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Messages
{
    internal class EventPublisher : BackgroundService
    {
        private readonly IHaBus _bus;
        private readonly MessageHandler _messageHandler;

        public EventPublisher(
            IHaBus bus
            , MessageHandler messageHandler
        )
        {
            _bus = bus;
            _messageHandler = messageHandler;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var message = await _bus.Receive();
                await _messageHandler.Handle(message);
            }
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await _bus.DisposeAsync();
            await base.StopAsync(cancellationToken);
        }
    }
}
