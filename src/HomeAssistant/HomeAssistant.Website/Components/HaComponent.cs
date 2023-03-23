using HomeAssistant.Domain;
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
                State = value.NewState.State;

                if (!string.IsNullOrWhiteSpace(ValueAttribute) && value.NewState.Attributes.ContainsKey(ValueAttribute))
                    Value = value.NewState.Attributes[ValueAttribute];

                await InvokeAsync(StateHasChanged);
            }

            if (value.EntityId == ValueEntityId)
            {
                Value = value.NewState.State;
                await InvokeAsync(StateHasChanged);
            }
        }

        protected override Task OnInitializedAsync()
        {
            if (!string.IsNullOrEmpty(ValueEntityId) && !string.IsNullOrWhiteSpace(ValueAttribute))
                throw new ArgumentException("Only one value can be filled in, else value can be overwritten");

            _subscription = Broker.Subscribe(this);
            return base.OnInitializedAsync();
        }
    }
}
