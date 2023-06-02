using AutoMapper;
using HomeAssistant.Common.Interfaces;
using HomeAssistant.Common.Models;
using HomeAssistant.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HomeAssistant.Application.Aggregates
{
    internal class DrawingAggregate : IDrawingAggregate
    {
        private readonly IHomeAssistantDbContext _context;
        private readonly IMapper _mapper;

        public DrawingAggregate(
            IHomeAssistantDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DrawingModel> Add(DrawingModel item)
        {
            var entity = _mapper.Map<Drawing>(item);

            RemoveRelations(entity);

            _context.Drawing.Add(entity);
            await _context.SaveChangesAsync();

            return await Get(entity.Id);
        }

        public async Task<DrawingModel> Delete(int id)
        {
            var entity = await Get(id);

            var deletedEntity = _context.Drawing.FirstOrDefault(x => x.Id == id);
            _context.Drawing.Remove(deletedEntity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<DrawingModel> Get(int id, CancellationToken cancellationToken = default)
        {
            var entity = await _context.Drawing.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
            var model = _mapper.Map<DrawingModel>(entity);
            return model;
        }

        public async Task<List<DrawingModel>> GetAll(CancellationToken cancellationToken = default)
        {
            var entities = await _context.Drawing.ToListAsync(cancellationToken);
            var models = _mapper.Map<List<DrawingModel>>(entities);
            return models;
        }

        public async Task<DrawingModel> Update(DrawingModel item)
        {
            var entity = _mapper.Map<DrawingModel>(item);

            var updatedEntity = _context.Drawing.FirstOrDefault(x => x.Id == item.Id);
            updatedEntity.Left = entity.Left;
            updatedEntity.Height = entity.Height;
            updatedEntity.Radius = entity.Radius;
            updatedEntity.Shape = entity.Shape;
            updatedEntity.StyleId = entity.StyleId;
            updatedEntity.Top = entity.Top;
            updatedEntity.Width = entity.Width;
            
            RemoveRelations(updatedEntity);

            await _context.SaveChangesAsync();

            return await Get(item.Id);
        }

        private static void RemoveRelations(Drawing entity)
        {
            entity.Style = null;
        }
    }
}
