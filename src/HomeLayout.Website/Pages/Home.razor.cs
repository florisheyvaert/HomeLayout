using HomeLayout.Common.Interfaces;
using HomeLayout.Common.Models;
using HomeLayout.Common.Static;
using HomeLayout.Domain;
using HomeLayout.Domain.Entities;
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
        [Inject] public IDrawingStyleAggregate DrawingStyleAggregate { get; set; }

        public List<DrawingModel> Drawings { get; private set; }
        public List<DrawingStyleModel> DrawingStyles { get; private set; }

        protected override async Task OnInitializedAsync()
        {
            DrawingStyles = await DrawingStyleAggregate.GetAll();
            Drawings = await DrawingAggregate.GetAll();

            await base.OnInitializedAsync();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await Drawer.OnInitializedAsync();

                // TODO looping instead of import because of the customproperties (id & styleid)
                // needs to be adjusted
                //await Drawer.Import(Drawings);
                foreach (var drawing in Drawings)
                {
                    await Drawer.Draw(drawing);
                }

            }

            await base.OnAfterRenderAsync(firstRender);
        }

        private async Task AddDrawing(string style)
        {
            var drawingStyle = DrawingStyles.FirstOrDefault(x => x.Name == style);
            var drawing = new DrawingModel
            {
                Left = 10,
                Top = 10,
                Width = 50,
                Height = 50,
                Style = drawingStyle,
                StyleId = drawingStyle.Id
            };

            drawing = await DrawingAggregate.Add(drawing);
            await Drawer.Draw(drawing);

            Drawings.Add(drawing);
        }

        private async Task Save()
        {
            var drawings = await Drawer.Export();

            foreach (var drawing in drawings)
            {
                // TODO needs to be removed, Style.Name is not nullable = wtf?
                var drawingStyle = DrawingStyles.FirstOrDefault(x => x.Id == drawing.StyleId);
                drawing.Style = drawingStyle;
                await DrawingAggregate.Update(drawing);
            }

            Drawings.Clear();
            Drawings = drawings;

            StateHasChanged();
        }
    }
}
