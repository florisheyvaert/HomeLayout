using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain;
using HomeAssistant.Domain.States;
using Microsoft.AspNetCore.Components;
using Observr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Website.Components
{
    public class HaComponent : ComponentBase, Observr.IObserver<HaStateChangedMessage>, IDisposable
    {
        private IDisposable _subscription;

        [Parameter] public string EntityId { get; set; }
        [Parameter] public string ValueAttribute { get; set; }
        [Parameter] public string ValueEntityId { get; set; }

        [Inject] public IBroker Broker { get; set; }
        [Inject] public IHaService HaService { get; set; }

        public object State { get; private set; }
        public object Value { get; private set; }

        public void Dispose()
        {
            _subscription.Dispose();
        }

        public async Task Handle(HaStateChangedMessage value, CancellationToken cancellationToken)
        {
            if (value.EntityId == EntityId)
            {
                State = value.NewState;

                if (!string.IsNullOrWhiteSpace(ValueAttribute) && value.NewState.Attributes.ContainsKey(ValueAttribute))
                    Value = value.NewState.Attributes[ValueAttribute];

                await InvokeAsync(StateHasChanged);
            }

            if (value.EntityId == ValueEntityId)
            {
                Value = value.NewState;
                await InvokeAsync(StateHasChanged);
            }
        }

        protected override async Task OnInitializedAsync()
        {
            if (!string.IsNullOrEmpty(ValueEntityId) && !string.IsNullOrWhiteSpace(ValueAttribute))
                throw new ArgumentException("Only one value can be filled in, else value can be overwritten");

            var state = await HaService.GetState<LightState>(EntityId);

            _subscription = Broker.Subscribe(this);
            await base.OnInitializedAsync();
        }
    }
}
