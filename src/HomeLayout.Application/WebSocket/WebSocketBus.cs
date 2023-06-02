using AutoMapper;
using HomeLayout.Application.WebSocket.Models;
using HomeLayout.Common;
using HomeLayout.Common.Extensions;
using HomeLayout.Common.Interfaces;
using HomeLayout.Domain;
using HomeLayout.Domain.States;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HomeLayout.Application.WebSocket
{
    internal class WebSocketBus : IHaBus
    {
        private ClientWebSocket _webSocket;
        private string _url;
        private string _accessToken;
        private readonly IMapper _mapper;
        private readonly ILogger<WebSocketBus> _logger;

        public WebSocketBus(IOptions<AppSettings> options, IMapper mapper, ILogger<WebSocketBus> logger)
        {
            _url = options.Value.HomeLayoutWebSocketUrl;
            _accessToken = options.Value.HomeLayoutAccessToken;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<HaMessage> Receive()
        {
            await Initialize();
            var message = await ReceiveAsync<Message>();

            var mapped = _mapper.Map<HaMessage>(message);

            if (message.Type == MessageType.Event)
            {
                if (message.Event.EventType == "state_changed")
                {
                    mapped = _mapper.Map<HaStateChangedMessage>(message);
                }
            }

            return mapped;
        }

        public async Task Send(HaCommand command)
        {
            await Initialize();

            var busCommand = new Command(command.EntityId)
            {
                Domain = command.Domain.ToString().ToSnakeCase(),
                Service = command.Service.ToString().ToSnakeCase(),
                Type = "call_service",
                ServiceData = command.Data,
                Id = IdGenerator.Id
            };

            await Send(busCommand);
        }

        public async ValueTask DisposeAsync()
        {
            await _webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, null, CancellationToken.None);
            _webSocket.Dispose();
        }

        private async Task Initialize()
        {
            if (_webSocket is null)
            {
                _webSocket = new();

                await _webSocket.ConnectAsync(new Uri(_url), CancellationToken.None);

                var authRequiredResponse = await ReceiveAsync();

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

                var subscription = new StateChangedSubscription();
                await Send(subscription);
            }
        }

        private async Task Send(object obj)
        {
            await _webSocket.SendAsync(obj.Serialize().ToBytes(), WebSocketMessageType.Text, WebSocketMessageFlags.EndOfMessage, CancellationToken.None);
        }

        private async Task<TE> ReceiveAsync<TE>()
        {
            var content = await ReceiveAsync();
            return string.IsNullOrWhiteSpace(content) ? default : JsonSerializer.Deserialize<TE>(content);
        }

        private async Task<string> ReceiveAsync()
        {
            var buffer = new byte[8192];
            var result = await _webSocket.ReceiveAsync(buffer, CancellationToken.None);
            var content = Encoding.ASCII.GetString(buffer, 0, result.Count);

            _logger.LogTrace("Bus message received: {content}", content);

            return content;
        }
    }
}
