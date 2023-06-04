using HomeLayout.Common.Models;

namespace HomeLayout.Website.Services
{
    public interface IDrawer
    {
        Task OnInitializedAsync();
        Task Draw(DrawingModel drawing);
        Task Import(List<DrawingModel> drawings);
        Task<List<DrawingModel>> Export();
    }
}
