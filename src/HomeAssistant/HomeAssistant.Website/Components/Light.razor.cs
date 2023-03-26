using HomeAssistant.Domain.States;

namespace HomeAssistant.Website.Components
{
    public class LightBase : HaComponent<LightState>
    {
        public string State { get => NewState?.Value ?? false ? "On" : "Off"; }
    }
}
