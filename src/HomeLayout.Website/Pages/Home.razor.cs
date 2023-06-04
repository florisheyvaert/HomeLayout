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

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await Drawer.OnInitializedAsync();
            }

            await base.OnAfterRenderAsync(firstRender);
        }
    }
}
