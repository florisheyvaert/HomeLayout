using HomeLayout.Domain.States;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace HomeLayout.Website.Components
{
    public class LightBase : HaComponent<LightState>
    {
        [Inject] public IJSRuntime JS { get; set; }

        public string OnOff { get => base.State?.Value ?? false ? "On" : "Off"; }

        protected override async Task StateChanged(LightState newState)
        {
            await JS.InvokeVoidAsync("SetValue", newState.Brightness);
        }

        protected async Task Toggle()
        {
            State.Value = !State.Value;

            if (State.Value)
                State.Brightness = 100;

            await HaService.SetState(State);
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                //await JS.InvokeVoidAsync("Test");
            }

            await base.OnAfterRenderAsync(firstRender);
        }
    }
}
