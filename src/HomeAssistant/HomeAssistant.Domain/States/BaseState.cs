using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Domain.States
{
    public class BaseState
    {
        public string EntityId { get; set; }
        public string FiendlyName { get; set; }
        public BasicState State { get; set; }
    }

    public enum BasicState
    {
        On, Off, Up, Down
    }
}
