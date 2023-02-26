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
            await Test();
        }

        private async Task Test()
        {
            var state = new LightState()
            {
                EntityId = "light.toilet_beneden",
                Brightness = 10
            };
            await HaService.SetLightState(state);
        }
    }
}
