using HomeAssistant.Application.Bus.Models;
using HomeAssistant.Common;
using HomeAssistant.Common.Extensions;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Bus
{
    public class Client
    {
        private string _url;
        private string _accessToken;
        private ClientWebSocket _webSocket;
        private readonly EventHandler _handler;

        public Client(
            EventHandler handler
            , IOptions<AppSettings> options
        )
        {
            // todo bind to options
            _url = "ws://192.168.5.6:8123/api/websocket";
            _accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI4ZTkzYTkyMzQ1Mjk0ZGM4YjE3Mjg5NWU2M2YwMTRiMiIsImlhdCI6MTY3NzE2MzQyMCwiZXhwIjoxOTkyNTIzNDIwfQ.EzSYYZajag1NOOZ4azEzi-TJSnDLFtOlYPuF7TCZ4AQ";
            _webSocket = new ClientWebSocket();
            _handler = handler;
        }

        public async Task Start(CancellationToken cancellationToken)
        {
            await Authorize();
            await Subscribe();
            await Listen(cancellationToken);
        }

        public async Task Stop()
        {
            await _webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, null, CancellationToken.None);
            _webSocket.Dispose();
        }

        private async Task Authorize()
        {
            await _webSocket.ConnectAsync(new Uri(_url), CancellationToken.None);

            var authRequiredResponse = await ReceiveAsync<AuthorizationInitalization>();

            if (authRequiredResponse.Type == "auth_required")
            {
                var authMessage = new AuthorizationRequest(_accessToken);
                await _webSocket.SendAsync(authMessage.Serialize().ToBytes(), WebSocketMessageType.Text, WebSocketMessageFlags.EndOfMessage, CancellationToken.None);

                var authResponse = await ReceiveAsync<AuthorizationResponse>();

                var startTime = new Stopwatch();
                startTime.Start();

                while (authResponse is null || startTime.Elapsed > TimeSpan.FromSeconds(5))
                {
                    authResponse = await ReceiveAsync<AuthorizationResponse>();
                }

                if (authResponse is null)
                {
                    throw new Exception($"Time out while gettings authorization response back");
                }

                if (authResponse.Type != "auth_ok")
                {
                    throw new Exception($"Login failed with following message '{authResponse.Message}'");
                }
            }
        }

        private async Task Subscribe()
        {
            var message = new SubscribeStateChanged();
            await _webSocket.SendAsync(message.Serialize().ToBytes(), WebSocketMessageType.Text, WebSocketMessageFlags.EndOfMessage, CancellationToken.None);
        }

        private async Task Listen(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var message = await ReceiveAsync();
                if (message.HasValue)
                {
                    if (message.Value.Item1 == Constants.StateChangedEventId)
                    {
                        var eventMessage = JsonSerializer.Deserialize<Event>(message.Value.Item2);
                        if (!string.IsNullOrWhiteSpace(eventMessage.Payload?.ToString()))
                        {
                            var eventToPublish = JsonSerializer.Deserialize<StateChangedEvent>(eventMessage.Payload.ToString());
                            await _handler.HandleStateChanged(eventToPublish);
                        }
                    }
                }
            }
        }

        private async Task<(int, string)?> ReceiveAsync()
        {
            var buffer = new byte[8192];
            var result = await _webSocket.ReceiveAsync(buffer, CancellationToken.None);
            var json = Encoding.ASCII.GetString(buffer, 0, result.Count);

            if (string.IsNullOrWhiteSpace(json))
                return null;

            var message = JsonSerializer.Deserialize<Message>(json);
            return (message.Id, json);
        }

        private async Task<TE> ReceiveAsync<TE>()
        {
            var buffer = new byte[8192];
            var result = await _webSocket.ReceiveAsync(buffer, CancellationToken.None);
            var json = Encoding.ASCII.GetString(buffer, 0, result.Count);

            return string.IsNullOrWhiteSpace(json) ? default : JsonSerializer.Deserialize<TE>(json);
        }
    }
}
