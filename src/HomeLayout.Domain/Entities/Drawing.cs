using HomeLayout.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Domain.Entities
{
    public class Drawing
    {
        public int Id { get; set; }

        public decimal Top { get; set; }
        public decimal Left { get; set; }
        public decimal? Width { get; set; }
        public decimal? Height { get; set; }
        public decimal? Radius { get; set; }
        public decimal? ScaleX { get; set; }
        public decimal? ScaleY { get; set; }
        public Shape Shape { get; set; }

        public int? StyleId { get; set; }
        public DrawingStyle? Style { get; set; }
    }
}
