using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HomeAssistant.Application.WebSocket.Models
{
    internal class AuthorizationRequest
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }

        public AuthorizationRequest(string accessToken)
        {
            AccessToken = accessToken;
            Type = "auth";
        }
    }

    internal class AuthorizationResponse
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}
