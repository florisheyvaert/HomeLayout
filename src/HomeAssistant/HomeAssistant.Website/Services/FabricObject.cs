using AutoMapper;

namespace HomeAssistant.Website.Services
{
    public class FabricObjectProfile : Profile
    {
        private const string _defaultStrokeColor = "#FFF";

        public FabricObjectProfile()
        {
            CreateMap<Drawing, FabricObject>()
                .ForMember(x => x.Type, opts => opts.MapFrom(y => Translate(y.Shape)))
                .ForMember(x => x.Fill, opts => opts.MapFrom(y => string.IsNullOrWhiteSpace(y.Style.FillColor) ? _defaultStrokeColor : y.Style.FillColor))
                .ForMember(x => x.StyleId, opts => opts.MapFrom(y => y.Style.Id))
                .ReverseMap()
                .AfterMap((x, y) => y.Style.FillColor = x.Fill)
                .AfterMap((x, y) => y.Style.Id = x.StyleId);
        }

        private string Translate(Shape shape)
        {
            return shape switch
            {
                Shape.Circle => "circle",
                Shape.Triangle => "triangle",
                _ => "rect",
            };
        }
    }

    public class FabricObjectExport
    {
        public List<FabricObject> Objects { get; set; } = new();
        public string Background { get; set; }
    }

    public class FabricObject
    {
        //"angle" : 0,
        //"fill" : "green",
        //"flipX" : false,
        //"flipY" : false,
        //"hasBorders" : true,
        //"hasControls" : true,
        //"hasRotatingPoint" : false,
        //"height" : 20,
        //"left" : 50,
        //"opacity" : 1,
        //"overlayFill" : null,
        //"perPixelTargetFind" : false,
        //"scaleX" : 1,
        //"scaleY" : 1,
        //"selectable" : true,
        //"stroke" : null,
        //"strokeDashArray" : null,
        //"strokeWidth" : 1,
        //"top" : 50,
        //"transparentCorners" : true,
        //"type" : "rect",
        //"width" : 20

        public int Id { get; set; }
        public int StyleId { get; set; }
        public string Type { get; set; }
        public decimal Top { get; set; }
        public decimal Left { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public decimal Radius { get; set; }
        public string Fill { get; set; }
    }
}
