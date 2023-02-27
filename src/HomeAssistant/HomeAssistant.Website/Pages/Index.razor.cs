using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain.States;
using Microsoft.AspNetCore.Components;

namespace HomeAssistant.Website.Pages
{
    public partial class Index
    {
        [Inject] public IHaService HaService { get; set; }

        protected override async Task OnInitializedAsync()
        {
        }

        private async Task On()
        {
            var state = new LightState()
            {
                EntityId = "light.toilet_beneden",
                State = BasicState.On
            };
            await HaService.SetLightState(state.TurnOn());
        }

        private async Task Off()
        {
            var state = new LightState()
            {
                EntityId = "light.toilet_beneden",
                State = BasicState.Off
            };
            await HaService.SetLightState(state);
        }

        private async Task Random()
        {
            var state = new LightState()
            {
                EntityId = "light.toilet_beneden",
                Brightness = new Random().Next(100)
            };
            await HaService.SetLightState(state);
        }
    }
}
