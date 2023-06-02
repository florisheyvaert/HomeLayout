using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Domain.States
{
    public class SwitchState : BaseState
    {
        public SwitchState(BaseState baseState) : base(baseState)
        {
        }

        public SwitchState()
        {

        }
    }
}
