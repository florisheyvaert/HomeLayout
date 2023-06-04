using HomeLayout.Common.Interfaces;
using HomeLayout.Common.Models;
using HomeLayout.Common.Static;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HomeLayout.Application.Clients
{
    public class DrawingClient : BaseClient<DrawingModel>, IDrawingAggregate
    {
        public DrawingClient(HttpClient client) : base(client) 
        {
        }

        public Task<DrawingModel> Add(DrawingModel item)
        {
            return base.Add(EndPoints.Drawing_Add, item);
        }

        public Task<DrawingModel> Delete(int id)
        {
            return base.Delete(EndPoints.Drawing_Delete.Resolve("id", id), id);
        }

        public Task<DrawingModel> Get(int id, CancellationToken cancellationToken = default)
        {
            return base.Get(EndPoints.Drawing_Get.Resolve("id", id), id, cancellationToken);
        }

        public Task<List<DrawingModel>> GetAll(CancellationToken cancellationToken = default)
        {
            return base.GetAll(EndPoints.Drawing_GetAll, cancellationToken);
        }

        public Task<DrawingModel> Update(DrawingModel item)
        {
            return base.Update(EndPoints.Drawing_Update, item);
        }
    }
}
