using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain;
using HomeAssistant.Domain.States;
using HomeAssistant.Website.Services;
using Microsoft.AspNetCore.Components;
using Observr;
using System.Security.Cryptography.Xml;

namespace HomeAssistant.Website.Pages
{
    public partial class Home
    {
        [Inject] public IDrawer Drawer { get; set; }

        protected override async Task OnInitializedAsync()
        {
            await base.OnInitializedAsync();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await Drawer.OnInitializedAsync();
            }

            await base.OnAfterRenderAsync(firstRender);
        }

        private async Task AddRect()
        {
            await Drawer.AddRect(100, 100, 10, 10, "#F00");
        }
    }
}
