using AutoMapper;
using Microsoft.JSInterop;
using System.Text.Json.Serialization;

namespace HomeAssistant.Website.Services
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

        public async Task Draw(Drawing drawing)
        {
            InitializedCheck();

            var fabricObject = _mapper.Map<FabricObject>(drawing);

            await _js.InvokeVoidAsync($"{_jsNameSpace}.AddDrawing", fabricObject);
        }

        public async Task ExportJson()
        {

        }

        private void InitializedCheck()
        {
            if (!_isInitialized)
                throw new ArgumentException("Initialize the canvas first");
        }
    }
}
