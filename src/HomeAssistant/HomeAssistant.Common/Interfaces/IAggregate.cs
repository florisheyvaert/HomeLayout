using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Common.Interfaces
{
    public interface IAggregate<TE>
    {
        Task<TE> Get(int id, CancellationToken cancellationToken = default);
        Task<List<TE>> GetAll(CancellationToken cancellationToken = default);
        Task<TE> Add(TE item);
        Task<TE> Update(TE item);
        Task<TE> Delete(int id);
    }
}
