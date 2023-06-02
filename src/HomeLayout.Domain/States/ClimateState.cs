using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Domain.States
{
    public class ClimateState : BaseState
    {
        public decimal Temperature { get; set; }
        public HvacMode HvacMode { get; set; }
    }

    public enum HvacMode
    {
        Heat, Cool
    }
}
