using AutoMapper;
using HomeAssistant.Application.Bus.Models;
using HomeAssistant.Domain.States;
using Observr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Bus
{
    public class Handler
    {
        private readonly IMapper _mapper;
        private readonly IBroker _broker;

        public Handler(
            IMapper mapper
            , IBroker broker
        )
        {
            _mapper = mapper;
            _broker = broker;
        }

        public async Task HandleStateChanged(StateChangedEvent eventToPublish)
        {
            var type = DetermineState(eventToPublish.Data.EntityId);
            if (type is object)
            {
                var oldState = _mapper.Map(eventToPublish.Data.OldState, typeof(State), type.GenericTypeArguments.First());
                var newState = _mapper.Map(eventToPublish.Data.NewState, typeof(State), type.GenericTypeArguments.First());

                // maybe without dynamic if possible?
                var stateChangedEvent = (dynamic)Activator.CreateInstance(type);
                stateChangedEvent.EntityId = eventToPublish.Data.EntityId;
                stateChangedEvent.NewState = (dynamic)newState;
                stateChangedEvent.OldState = (dynamic)oldState;

                await _broker.Publish(stateChangedEvent);
            }
        }

        private Type DetermineState(string entityId)
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
