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

        private async Task Export()
        {
            var result = await Drawer.Export();
        }

        private async Task AddRect()
        {
            var style = new DrawingStyle()
            {
                Id = 300,
                FillColor = "#F00"
            };

            var drawing = new Drawing()
            {
                Id = 1,
                Top = 10,
                Left = 10,
                Height = 50,
                Width = 10,
                Shape = Shape.Rectangle,
                Style = style
            };

            await Drawer.Draw(drawing);
        }

        private async Task AddCircle()
        {
            var style = new DrawingStyle()
            {
                Id = 200,
                FillColor = "#F00"
            };

            var drawing = new Drawing()
            {
                Id = 2,
                Radius = 10,
                Top = 10,
                Left = 10,
                Shape = Shape.Circle,
                Style = style
            };

            await Drawer.Draw(drawing);
        }

        private async Task AddTriangle()
        {
            var style = new DrawingStyle()
            {
                Id = 100,
                FillColor = "#F00"
            };

            var drawing = new Drawing()
            {
                Id = 3,
                Top = 10,
                Left = 10,
                Height = 50,
                Width = 10,
                Shape = Shape.Triangle,
                Style = style
            };

            await Drawer.Draw(drawing);
        }
    }
}
