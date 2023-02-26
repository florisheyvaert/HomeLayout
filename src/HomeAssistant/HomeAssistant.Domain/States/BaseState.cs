using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Domain.States
{
    public class BaseState<TE>
    {
        public string EntityId { get; set; }
        public DateTime ChangedAt { get; set; }
        public TE Value { get; set; }
    }
}
