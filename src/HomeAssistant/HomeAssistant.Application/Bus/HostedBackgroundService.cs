using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Bus
{
    public class HostedBackgroundService : BackgroundService
    {
        private readonly Client _bus;

        public HostedBackgroundService(Client bus)
        {
            _bus = bus;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await _bus.Start(stoppingToken);
        }

        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await _bus.Stop();
            await base.StopAsync(cancellationToken);
        }
    }
}
