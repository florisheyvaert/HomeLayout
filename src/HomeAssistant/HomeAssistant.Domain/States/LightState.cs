namespace HomeAssistant.Domain.States
{
    public class LightState : BaseState<string>
    {
        public decimal Brightness { get; set; }
        public string FriendlyName { get; set; }
    }
}
