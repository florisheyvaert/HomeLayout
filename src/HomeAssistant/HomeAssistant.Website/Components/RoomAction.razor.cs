using HomeAssistant.Domain.States;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Website.Components
{
    public partial class RoomAction
    {
        [Parameter] public string Icon { get; set; }
        [Parameter] public string EntityId { get; set; }

        public string Value { get; set; } = "108.5 Watt";
        public BasicState State { get; set; }
        public string IsActive { get => State == BasicState.On ? "active" : string.Empty; }
    }
}
