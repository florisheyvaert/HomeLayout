using HomeLayout.Common.Interfaces;
using HomeLayout.Common.Models;
using HomeLayout.Common.Static;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Application.Clients
{
    public class DrawingStyleClient : BaseClient<DrawingStyleModel>, IDrawingStyleAggregate
    {
        public DrawingStyleClient(HttpClient client) : base(client)
        {
                
        }

        public Task<DrawingStyleModel> Add(DrawingStyleModel item)
        {
            return base.Add(EndPoints.DrawingStyle_Add, item);
        }

        public Task<DrawingStyleModel> Delete(int id)
        {
            return base.Delete(EndPoints.DrawingStyle_Delete.Resolve("id", id), id);
        }

        public Task<DrawingStyleModel> Get(int id, CancellationToken cancellationToken = default)
        {
            return base.Get(EndPoints.DrawingStyle_Get.Resolve("id", id), id, cancellationToken);
        }

        public Task<List<DrawingStyleModel>> GetAll(CancellationToken cancellationToken = default)
        {
            return base.GetAll(EndPoints.DrawingStyle_GetAll, cancellationToken);
        }

        public Task<DrawingStyleModel> Update(DrawingStyleModel item)
        {
            return base.Update(EndPoints.DrawingStyle_Update, item);
        }
    }
}
