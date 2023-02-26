using AutoMapper;
using HomeAssistant.Application.Bus.Models;
using HomeAssistant.Common;
using HomeAssistant.Domain.Events;
using HomeAssistant.Domain.States;
using Observr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Bus.Strategies
{
    internal class EventStrategy : BaseStrategy
    {
        private readonly IMapper _mapper;
        private readonly IBroker _broker;

        public override MessageType Type => MessageType.Event;

        public EventStrategy(IMapper mapper, IBroker broker)
        {
            _mapper = mapper;
            _broker = broker;
        }

        public override async Task Execute(string content)
        {
            var eventMessage = JsonSerializer.Deserialize<Event>(content);
            if (eventMessage.Id == Constants.StateChangedEventId)
            {
                var busEvent = JsonSerializer.Deserialize<StateChangedEvent>(eventMessage.Payload.ToString());
                var stateToPublish = BuildState(busEvent);
                await _broker.Publish(stateToPublish);
            }
        }

        private object BuildState(StateChangedEvent? busEvent)
        {
            var type = GetStateType(busEvent.Data.EntityId);
            if (type is object)
            {
                var oldState = _mapper.Map(busEvent.Data.OldState, typeof(State), type.GenericTypeArguments.First());
                var newState = _mapper.Map(busEvent.Data.NewState, typeof(State), type.GenericTypeArguments.First());

                // maybe without dynamic if possible?
                var stateChangedEvent = (dynamic)Activator.CreateInstance(type);
                stateChangedEvent.EntityId = busEvent.Data.EntityId;
                stateChangedEvent.NewState = (dynamic)newState;
                stateChangedEvent.OldState = (dynamic)oldState;

                return stateChangedEvent;
            }
            else 
                return null;
        }

        private Type GetStateType(string entityId)
        {
            if (entityId.StartsWith("light."))
                return typeof(Domain.Events.StateChangedEvent<LightState>);
            else if (entityId.StartsWith("switch."))
                return typeof(Domain.Events.StateChangedEvent<SwitchState>);
            else
                return null;
        }
    }
}
