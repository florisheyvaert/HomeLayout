namespace HomeAssistant.Website.Services
{
    public interface IDrawer
    {
        Task OnInitializedAsync();
        Task Draw(Drawing drawing);
        Task<List<Drawing>> Export();
    }
}
