using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Common.Models
{
    public class DrawingStyleModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string FillColor { get; set; }
        public string StrokeColor { get; set; }
        public decimal StrokeWidth { get; set; }
    }
}
