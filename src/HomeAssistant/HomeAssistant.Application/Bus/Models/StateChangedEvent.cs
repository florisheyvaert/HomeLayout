using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Bus.Models
{
    public class StateChangedEvent
    {
        [JsonPropertyName("event_type")]
        public string EventType { get; set; }

        [JsonPropertyName("data")]
        public StateChangedEventData Data { get; set; }

        [JsonPropertyName("time_fired")]
        public DateTime TimeFired { get; set; }
    }

    public class StateChangedEventData
    {
        [JsonPropertyName("entity_id")]
        public string EntityId { get; set; }

        [JsonPropertyName("new_state")]
        public State NewState { get; set; }

        [JsonPropertyName("old_state")]
        public State OldState { get; set; }
    }
}
