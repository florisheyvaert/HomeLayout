using HomeLayout.Common.Models;
using HomeLayout.Common.Static;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HomeLayout.Application.Clients
{
    public class BaseClient<T>
    {
        private readonly HttpClient _client;

        public BaseClient(HttpClient client)
        {
            _client = client;
        }

        public async Task<T> Add(T item)
        {
            var body = new StringContent(JsonSerializer.Serialize(item), Encoding.UTF8, "application/json");
            var request = await _client.PostAsync(EndPoints.Drawing_Add, body);
            var content = await request.Content.ReadAsStringAsync();

            if (!request.IsSuccessStatusCode)
            {
                throw new Exception($"Error while adding {nameof(T)} ('{request.StatusCode}': '{content}'");
            }

            var result = JsonSerializer.Deserialize<T>(content, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
            return result;
        }

        public async Task<T> Delete(int id)
        {
            var request = await _client.DeleteAsync(EndPoints.Drawing_Delete.Resolve("id", id));
            var content = await request.Content.ReadAsStringAsync();

            if (!request.IsSuccessStatusCode)
            {
                throw new Exception($"Error while deleting {nameof(T)} ('{request.StatusCode}': '{content}'");
            }

            var result = JsonSerializer.Deserialize<T>(content, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
            return result;
        }

        public async Task<T> Get(int id, CancellationToken cancellationToken = default)
        {
            var request = await _client.GetAsync(EndPoints.Drawing_Get.Resolve("id", id), cancellationToken);
            var content = await request.Content.ReadAsStringAsync();

            if (!request.IsSuccessStatusCode)
            {
                throw new Exception($"Error while getting {nameof(T)} with id '{id}' ('{request.StatusCode}': '{content}'");
            }

            if (request.StatusCode == System.Net.HttpStatusCode.NoContent)
            {
                return default;
            }

            var result = JsonSerializer.Deserialize<T>(content, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
            return result;
        }

        public async Task<List<T>> GetAll(CancellationToken cancellationToken = default)
        {
            var request = await _client.GetAsync(EndPoints.Drawing_GetAll, cancellationToken);
            var content = await request.Content.ReadAsStringAsync();

            if (!request.IsSuccessStatusCode)
            {
                throw new Exception($"Error while getting all {nameof(T)} ('{request.StatusCode}': '{content}'");
            }

            var result = JsonSerializer.Deserialize<List<T>>(content, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
            return result;
        }

        public async Task<T> Update(T item)
        {
            var body = new StringContent(JsonSerializer.Serialize(item), Encoding.UTF8, "application/json");
            var request = await _client.PutAsync(EndPoints.Drawing_Update, body);
            var content = await request.Content.ReadAsStringAsync();

            if (!request.IsSuccessStatusCode)
            {
                throw new Exception($"Error while updating {nameof(T)} ('{request.StatusCode}': '{content}'");
            }

            var result = JsonSerializer.Deserialize<T>(content, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
            return result;
        }
    }
}
