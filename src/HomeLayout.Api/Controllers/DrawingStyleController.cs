using HomeLayout.Common.Interfaces;
using HomeLayout.Common.Models;
using HomeLayout.Common.Static;
using Microsoft.AspNetCore.Mvc;

namespace HomeLayout.Api.Controllers
{
    [ApiController]
    public class DrawingStyleController : ControllerBase
    {
        private readonly IDrawingStyleAggregate _drawingStyleAggregate;

        public DrawingStyleController(IDrawingStyleAggregate drawingStyleAggregate)
        {
            _drawingStyleAggregate = drawingStyleAggregate;
        }

        [HttpGet()]
        [Route(EndPoints.DrawingStyle_GetAll)]
        public async Task<ActionResult<IEnumerable<DrawingStyleModel>>> GetAll()
        {
            var drawings = await _drawingStyleAggregate.GetAll();
            return Ok(drawings);
        }

        [HttpGet()]
        [Route(EndPoints.DrawingStyle_Get)]
        public async Task<ActionResult<IEnumerable<DrawingStyleModel>>> Get([FromRoute]int id)
        {
            var drawing = await _drawingStyleAggregate.Get(id);
            return Ok(drawing);
        }

        [HttpPost()]
        [Route(EndPoints.DrawingStyle_Add)]
        public async Task<ActionResult<IEnumerable<DrawingStyleModel>>> Add(DrawingStyleModel drawing)
        {
            var model = await _drawingStyleAggregate.Add(drawing);
            return Ok(model);
        }

        [HttpPut()]
        [Route(EndPoints.DrawingStyle_Update)]
        public async Task<ActionResult<IEnumerable<DrawingStyleModel>>> Update(DrawingStyleModel drawing)
        {
            var model = await _drawingStyleAggregate.Update(drawing);
            return Ok(model);
        }

        [HttpDelete()]
        [Route(EndPoints.DrawingStyle_Delete)]
        public async Task<ActionResult<IEnumerable<DrawingStyleModel>>> Delete([FromRoute]int id)
        {
            var model = await _drawingStyleAggregate.Delete(id);
            return Ok(model);
        }
    }
}
