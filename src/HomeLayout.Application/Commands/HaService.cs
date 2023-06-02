using AutoMapper;
using HomeLayout.Application.WebSocket.Models;
using HomeLayout.Common.Interfaces;
using HomeLayout.Domain;
using HomeLayout.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HomeLayout.Application.Commands
{
    internal class HaService : IHaService
    {
        private readonly IHaBus _bus;
        private readonly IMapper _mapper;
        private readonly IHttpClientFactory _httpClientFactory;

        public HaService(
            IHaBus bus,
            IMapper mapper,
            IHttpClientFactory httpClientFactory
        )
        {
            _bus = bus;
            _mapper = mapper;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<BaseState> GetState(string entityId)
        {
            var url = $"api/states/{entityId}";
            var client = _httpClientFactory.CreateClient("ha");
            var request = await client.GetAsync(url);
            var content = await request.Content.ReadAsStringAsync();

            if (request.IsSuccessStatusCode)
            {
                var state = JsonSerializer.Deserialize<State>(content, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                var mapped = _mapper.Map<BaseState>(state);
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
