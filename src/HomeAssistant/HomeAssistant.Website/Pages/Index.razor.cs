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
            var state = new CoverState()
            {
                EntityId = "cover.bureau",
                State = BasicState.Down
            };
            await HaService.SetState(state);
        }

        private async Task Off()
        {
            var state = new CoverState()
            {
                EntityId = "cover.bureau",
                State = BasicState.Up
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
