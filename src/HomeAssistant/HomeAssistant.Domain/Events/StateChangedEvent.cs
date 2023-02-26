using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Domain.Events
{
    public class StateChangedEvent<TE>
    {
        public string EntityId { get; set; }
        public TE OldState { get; set; }
        public TE NewState { get; set; }
    }
}
