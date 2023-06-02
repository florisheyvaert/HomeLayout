using HomeAssistant.Common.Interfaces;
using HomeAssistant.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeAssistant.Api.Controllers
{
    [ApiController]
    [Route("api/drawing")]
    public class DrawingController : ControllerBase
    {
        private readonly IDrawingAggregate _drawingAggregate;

        public DrawingController(IDrawingAggregate drawingAggregate)
        {
            _drawingAggregate = drawingAggregate;
        }

        [HttpGet()]
        [Route("getall")]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> GetAll()
        {
            var drawings = await _drawingAggregate.GetAll();
            return Ok(drawings);
        }

        [HttpGet(Name = "Get")]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> Get(int id)
        {
            var drawing = await _drawingAggregate.Get(id);
            return Ok(drawing);
        }

        [HttpPost(Name = "Add")]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> Add(DrawingModel drawing)
        {
            var model = await _drawingAggregate.Add(drawing);
            return Ok(model);
        }

        [HttpPut(Name = "Update")]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> Update(DrawingModel drawing)
        {
            var model = await _drawingAggregate.Update(drawing);
            return Ok(model);
        }

        [HttpDelete(Name = "Delete")]
        public async Task<ActionResult<IEnumerable<DrawingModel>>> Delete(int id)
        {
            var model = await _drawingAggregate.Delete(id);
            return Ok(model);
        }
    }
}
