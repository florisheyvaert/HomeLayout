using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain;
using HomeAssistant.Domain.States;
using Microsoft.AspNetCore.Components;
using Observr;
using System.Security.Cryptography.Xml;

namespace HomeAssistant.Website.Pages
{
    public partial class Home : Observr.IObserver<HaStateChangedMessage>
    {
        private IDisposable _subscription;

        [Inject] public IHaService HaService { get; set; }

        [Inject] public IBroker Broker { get; set; }

        public LightState Light { get; set; } = new();

        protected override async Task OnInitializedAsync()
        {
            _subscription = Broker.Subscribe(this);
        }

        public async Task Handle(HaStateChangedMessage value, CancellationToken cancellationToken)
        {
            if (value.EntityId == "light.toilet_beneden")
            {
                Light = new(value.NewState);
                await InvokeAsync(StateHasChanged);
            }
        }

        private async Task On()
        {
            var state = new CoverState()
            {
                EntityId = "cover.bureau",
                State = BasicState.Off
            };
            await HaService.SetState(state);
        }

        private async Task Off()
        {
            var state = new CoverState()
            {
                EntityId = "cover.bureau",
                State = BasicState.On
            };
            await HaService.SetState(state);
        }

        private async Task Random()
        {
            var state = new CoverState()
            {
                EntityId = "cover.bureau",
                Position = 50
            };
            await HaService.SetState(state);
        }
    }
}
