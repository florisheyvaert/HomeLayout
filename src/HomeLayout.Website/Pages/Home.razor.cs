using HomeLayout.Common.Interfaces;
using HomeLayout.Common.Models;
using HomeLayout.Domain;
using HomeLayout.Domain.States;
using HomeLayout.Website.Services;
using Microsoft.AspNetCore.Components;
using Observr;
using System.Security.Cryptography.Xml;

namespace HomeLayout.Website.Pages
{
    public partial class Home
    {
        [Inject] public IDrawer Drawer { get; set; }
        [Inject] public IDrawingAggregate DrawingAggregate { get; set; }

        public List<DrawingModel> Drawings { get; private set; }

        protected override async Task OnInitializedAsync()
        {
            var testDrawing = new DrawingModel()
            {
                Height = 200,
                Left = 200,
                Shape = Domain.ValueObjects.Shape.Triangle
            };

            var addedDrawing = await DrawingAggregate.Add(testDrawing);

            addedDrawing.Height = 400;

            var updatedDrawing = await DrawingAggregate.Update(addedDrawing);

            var deletedDrawing = await DrawingAggregate.Delete(addedDrawing.Id);

            Drawings = await DrawingAggregate.GetAll();
            var drawing = await DrawingAggregate.Get(3);
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
