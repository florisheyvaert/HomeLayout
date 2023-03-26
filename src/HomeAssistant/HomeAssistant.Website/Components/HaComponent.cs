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
    public class HaComponent<TE> : ComponentBase, Observr.IObserver<HaStateChangedMessage>, IDisposable where TE : BaseState
    {
        private IDisposable _subscription;

        [Parameter] public string EntityId { get; set; }

        [Inject] public IBroker Broker { get; set; }
        [Inject] public IHaService HaService { get; set; }

        public TE OldState { get; private set; }
        public TE NewState { get; private set; }

        public void Dispose()
        {
            _subscription.Dispose();
        }

        public async Task Handle(HaStateChangedMessage value, CancellationToken cancellationToken)
        {
            if (value.EntityId == EntityId)
            {
                OldState = (TE)Activator.CreateInstance(typeof(TE), value.OldState);
                NewState = (TE)Activator.CreateInstance(typeof(TE), value.NewState);

                await InvokeAsync(StateHasChanged);
            }
        }

        protected override async Task OnInitializedAsync()
        {
            var initialState = await HaService.GetState(EntityId);
            NewState = (TE)Activator.CreateInstance(typeof(TE), initialState);

            _subscription = Broker.Subscribe(this);
            
            await base.OnInitializedAsync();
        }
    }
}
