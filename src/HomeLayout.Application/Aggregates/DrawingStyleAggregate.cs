using AutoMapper;
using HomeLayout.Common.Interfaces;
using HomeLayout.Common.Models;
using HomeLayout.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Application.Aggregates
{
    public class DrawingStyleAggregate : IDrawingStyleAggregate
    {
        private readonly IHomeLayoutDbContext _context;
        private readonly IMapper _mapper;

        public DrawingStyleAggregate(IHomeLayoutDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<DrawingStyleModel> Add(DrawingStyleModel item)
        {
            throw new NotImplementedException();
        }

        public Task<DrawingStyleModel> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<DrawingStyleModel> Get(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DrawingStyleModel>> GetAll(CancellationToken cancellationToken = default)
        {
            var styles = await _context.DrawingStyle.ToListAsync(cancellationToken);
            var models = _mapper.Map<List<DrawingStyleModel>>(styles);
            return models;
        }

        public Task<DrawingStyleModel> Update(DrawingStyleModel item)
        {
            throw new NotImplementedException();
        }
    }
}
