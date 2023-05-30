using Microsoft.JSInterop;

namespace HomeAssistant.Website.Services
{
    public class Fabric : IDrawer
    {
        private readonly IJSRuntime _js;
        private bool _isInitialized;

        public Fabric(IJSRuntime js)
        {
            _js = js;
        }

        public async Task OnInitializedAsync()
        {
            await _js.InvokeVoidAsync("customFabric.Initialize", "home");

            _isInitialized = true;
        }

        public async Task AddRect(decimal top, decimal left, decimal width, decimal height, string fill)
        {
            InitializedCheck();

            await _js.InvokeVoidAsync("customFabric.AddRect", top, left, width, height, fill);
        }

        private void InitializedCheck()
        {
            if (!_isInitialized)
                throw new ArgumentException("Initialize the canvas first");
        }
    }
}
