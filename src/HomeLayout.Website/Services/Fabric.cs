using AutoMapper;
using HomeLayout.Common.Models;
using Microsoft.JSInterop;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace HomeLayout.Website.Services
{
    public class Fabric : IDrawer
    {
        private readonly IJSRuntime _js;
        private readonly IMapper _mapper;
        private bool _isInitialized;
        private string _jsNameSpace = "customFabric";

        public Fabric(IJSRuntime js, IMapper mapper)
        {
            _js = js;
            _mapper = mapper;
        }

        public async Task OnInitializedAsync()
        {
            await _js.InvokeVoidAsync($"{_jsNameSpace}.Initialize", "home");

            _isInitialized = true;
        }

        public async Task Draw(DrawingModel drawing)
        {
            InitializedCheck();

            var fabricObject = _mapper.Map<FabricObject>(drawing);

            await _js.InvokeVoidAsync($"{_jsNameSpace}.AddDrawing", fabricObject);
        }

        public async Task<List<DrawingModel>> Export()
        {
            InitializedCheck();

            var output = await _js.InvokeAsync<string>($"{_jsNameSpace}.ExportJson");
            var export = JsonSerializer.Deserialize<FabricObjectExport>(output, options: new() { PropertyNameCaseInsensitive = true });
            var mapped = _mapper.Map<List<DrawingModel>>(export.Objects);

            return mapped;
        }

        public async Task Import(List<DrawingModel> drawings)
        {
            InitializedCheck();

            var mapped = _mapper.Map<List<FabricObject>>(drawings);
            var export = new FabricObjectExport() { Objects = mapped };
            var import = JsonSerializer.Serialize(export, new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            
            await _js.InvokeAsync<string>($"{_jsNameSpace}.ImportJson", import);
        }

        private void InitializedCheck()
        {
            if (!_isInitialized)
                throw new ArgumentException("Initialize the canvas first");
        }
    }
}
