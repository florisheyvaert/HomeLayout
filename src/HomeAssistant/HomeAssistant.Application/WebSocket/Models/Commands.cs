using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeAssistant.Application.WebSocket.Models
{
    internal class Command
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("domain")]
        public string Domain { get; set; }

        [JsonPropertyName("service")]
        public string Service { get; set; }

        [JsonPropertyName("service_data")]
        public object ServiceData { get; set; }

        [JsonPropertyName("target")]
        public CommandTarget Target { get; set; }

        public Command(string entityId) : base()
        {
            Id = 5;
            Target = new() { EntityId = entityId };
        }
    }

    internal class CommandTarget
    {
        [JsonPropertyName("entity_id")]
        public string EntityId { get; set; }
    }
}
