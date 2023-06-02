namespace HomeAssistant.Website.Services
{
    public class Drawing
    {
        public decimal Top { get; set; }
        public decimal Left { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public decimal Radius { get; set; }
        public Shape Shape { get; set; }

        public DrawingStyle Style { get; set; } = new();
    }

    public class DrawingStyle
    {
        public string FillColor { get; set; }
        public string StrokeColor { get; set; }
        public decimal StrokeWidth { get; set; }
    }

    public enum Shape
    {
        Rectangle, Triangle, Circle
    }
}
