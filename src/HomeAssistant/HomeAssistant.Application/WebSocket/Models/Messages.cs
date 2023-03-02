using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeAssistant.Application.WebSocket.Models
{
    internal class Message
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("type")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MessageType Type { get; set; }

        [JsonPropertyName("event")]
        public Event Event { get; set; }

        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("result")]
        public object Result { get; set; }
    }

    public class Event
    {
        [JsonPropertyName("event_type")]
        public string EventType { get; set; }

        [JsonPropertyName("data")]
        public EventData Data { get; set; }

        [JsonPropertyName("time_fired")]
        public DateTime TimeFired { get; set; }
    }

    public class EventData
    {
        [JsonPropertyName("entity_id")]
        public string EntityId { get; set; }

        [JsonPropertyName("new_state")]
        public State NewState { get; set; }

        [JsonPropertyName("old_state")]
        public State OldState { get; set; }
    }

    public class State
    {
        [JsonPropertyName("entity_id")]
        public string EntityId { get; set; }

        [JsonPropertyName("state")]
        public string Value { get; set; }

        [JsonPropertyName("attributes")]
        public Dictionary<string, object> Attributes { get; set; }

        [JsonPropertyName("last_changed")]
        public DateTime LastChanged { get; set; }

        [JsonPropertyName("last_updated")]
        public DateTime LastUpdated { get; set; }
    }

    internal enum MessageType
    {
        Event, Result
    }
}
