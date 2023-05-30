namespace HomeAssistant.Website.Services
{
    public interface IDrawer
    {
        Task OnInitializedAsync();
        Task AddRect(decimal top, decimal left, decimal width, decimal height, string fill);
    }
}
