using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Domain.States
{
    public class CoverState : BaseState
    {
        public decimal Position { get; set; }

        public CoverState(BaseState state) : base(state)
        {
            
        }

        public CoverState()
        {
            
        }
    }
}
