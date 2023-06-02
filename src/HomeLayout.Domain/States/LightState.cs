using HomeLayout.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Domain.States
{
    public class LightState : BaseState
    {
        public decimal Brightness
        {
            get => Math.Round(GetAttributeDecimal("brightness") / (decimal)2.56);
            set => SetAtttribute("brightness", value * (decimal)2.56);
        }

        public LightState(BaseState baseState) : base(baseState)
        {
        }

        public LightState()
        {
            
        }
    }
}
