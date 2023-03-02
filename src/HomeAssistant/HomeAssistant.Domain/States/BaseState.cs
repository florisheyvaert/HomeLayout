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

        public string FriendlyName { get; set; }

        public BasicState State { get; set; }

        public Dictionary<string, object> Attributes { get; set; }

        public BaseState(BaseState baseState)
        {
            EntityId = baseState.EntityId;
            FriendlyName = baseState.FriendlyName;      
            Attributes = baseState.Attributes;
        }

        public BaseState()
        {
            
        }
    }

    public enum BasicState
    {
        On, Off
    }
}
