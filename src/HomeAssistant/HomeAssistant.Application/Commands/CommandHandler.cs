using AutoMapper;
using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain;
using HomeAssistant.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Commands
{
    internal class CommandHandler : IHaService
    {
        private readonly IHaBus _bus;
        private readonly IMapper _mapper;
        private readonly IHttpClientFactory _httpClientFactory;

        public CommandHandler(
            IHaBus bus,
            IMapper mapper,
            IHttpClientFactory httpClientFactory
        )
        {
            _bus = bus;
            _mapper = mapper;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<TE> GetState<TE>(string entityId) where TE : BaseState
        {
            //var url = $"http://192.168.5.6:8123/api/states/{entityId}"; // todo fix this sht
            var url = $"api/states/{entityId}";
            var client = _httpClientFactory.CreateClient("ha");
            var request = await client.GetAsync(url);
            var content = await request.Content.ReadAsStringAsync();

            if (request.IsSuccessStatusCode)
            {
                var mapped = JsonSerializer.Deserialize<TE>(content);
                return mapped;
            }
            else
            {
                throw new Exception($"Error while getting state: {request.StatusCode} - {content}");
            }
        }

        public async Task SetState<TE>(TE state) where TE : BaseState
        {
            var command = _mapper.Map<HaCommand>(state);
            await _bus.Send(command);
        }
    }
}
