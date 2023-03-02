using HomeAssistant.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Domain.States
{
    public class LightState : BaseState
    {
        public decimal Brightness { get; set; }

        public LightState(BaseState baseState) : base(baseState)
        {
            Brightness = GetAttributeDecimal("brightness") / (decimal)2.56;
        }

        public LightState TurnOn()
        {
            Brightness = 100;
            return this;
        }

        public LightState Dim(decimal brightness)
        {
            Brightness = brightness;
            return this;
        }
    }
}
