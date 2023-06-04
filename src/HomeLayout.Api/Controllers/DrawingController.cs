using HomeLayout.Common.Interfaces;
using HomeLayout.Common.Models;
using HomeLayout.Common.Static;
using Microsoft.AspNetCore.Mvc;

namespace HomeLayout.Api.Controllers
{
    [ApiController]
    public class DrawingController : ControllerBase
    {
        private readonly IDrawingAggregate _drawingAggregate;

        public DrawingController(IDrawingAggregate drawingAggregate)
        {
            _drawingAggregate = drawingAggregate;
        }

        [HttpGet()]
        [Route(EndPoints.Drawing_GetAll)]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> GetAll()
        {
            var drawings = await _drawingAggregate.GetAll();
            return Ok(drawings);
        }

        [HttpGet()]
        [Route(EndPoints.Drawing_Get)]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> Get([FromRoute]int id)
        {
            var drawing = await _drawingAggregate.Get(id);
            return Ok(drawing);
        }

        [HttpPost()]
        [Route(EndPoints.Drawing_Add)]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> Add(DrawingModel drawing)
        {
            var model = await _drawingAggregate.Add(drawing);
            return Ok(model);
        }

        [HttpPut()]
        [Route(EndPoints.Drawing_Update)]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> Update(DrawingModel drawing)
        {
            var model = await _drawingAggregate.Update(drawing);
            return Ok(model);
        }

        [HttpDelete()]
        [Route(EndPoints.Drawing_Delete)]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> Delete([FromRoute]int id)
        {
            var model = await _drawingAggregate.Delete(id);
            return Ok(model);
        }
    }
}
