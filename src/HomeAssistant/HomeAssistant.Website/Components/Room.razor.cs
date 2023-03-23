using Microsoft.AspNetCore.Components;

namespace HomeAssistant.Website.Components;

public partial class Room
{
    [Parameter] public string Name { get; set; }
}