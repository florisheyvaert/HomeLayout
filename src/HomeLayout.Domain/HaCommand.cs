using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Domain
{
    public class HaCommand
    {
        public CommandDomain Domain { get; set; }
        public CommandService Service { get; set; }
        public Dictionary<string, object> Data { get; set; }
        public string EntityId { get; set; }
    }

    public enum CommandDomain
    {
        Light, Switch, Cover, Climate
    }

    public enum CommandService
    {
        TurnOn, TurnOff, OpenCover, CloseCover, StopCover, SetCoverPosition, SetHvacMode, SetTemperature
    }
}
