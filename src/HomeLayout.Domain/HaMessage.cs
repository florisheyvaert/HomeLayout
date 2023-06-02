using HomeLayout.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Domain
{
    public class HaMessage
    {
        public int Id { get; set; }

        public HaMessageType MessageType { get; set; }
    }

    public class HaStateChangedMessage : HaMessage
    {
        public string EntityId { get; set; }

        public DateTime TimeFired { get; set; }

        public BaseState OldState { get; set; }

        public BaseState NewState { get; set; }
    }

    public enum HaMessageType { Event, Result }
}
