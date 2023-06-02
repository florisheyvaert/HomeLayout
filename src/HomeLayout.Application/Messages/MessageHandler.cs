using HomeLayout.Common.Interfaces;
using HomeLayout.Domain;
using HomeLayout.Domain.States;
using Observr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Application.Messages
{
    internal class MessageHandler
    {
        private readonly IBroker _broker;

        public MessageHandler(
            IBroker broker
        )
        {
            _broker = broker;
        }

        public async Task Handle(HaMessage message)
        {
            if (message is HaStateChangedMessage stateChangedMessage)
                await _broker.Publish(stateChangedMessage);
        }
    }
}
