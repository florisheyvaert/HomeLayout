namespace HomeAssistant.Domain.States
{
    public class SwitchState : BaseState<string>
    {
        public string FriendlyName { get; set; }
    }
}
