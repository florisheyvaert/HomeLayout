using HomeAssistant.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Bus.Models
{
    public class SubscribeStateChanged
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("event_type")]
        public string EventType { get; set; }

        public SubscribeStateChanged()
        {
            Type = "subscribe_events";
            EventType = "state_changed";
            Id = Constants.StateChangedEventId;
        }
    }
}
