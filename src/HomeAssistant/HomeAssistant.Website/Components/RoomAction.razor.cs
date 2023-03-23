using HomeAssistant.Domain.States;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Website.Components
{
    public class RoomActioBase : HaComponent
    {
        [Parameter] public string Icon { get; set; }
        [Parameter] public string Unit { get; set; }

        public string ValueWithUnit { get => $"{Value} {(Value is object ? Unit : string.Empty)}"; }
        public string IsActive { get => State?.ToString() == "On" ? "active" : string.Empty; }
    }
}
