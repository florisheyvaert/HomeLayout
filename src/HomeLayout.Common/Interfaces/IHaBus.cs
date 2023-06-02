using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HomeLayout.Domain;

namespace HomeLayout.Common.Interfaces
{
    public interface IHaBus : IAsyncDisposable
    {
        Task Send(HaCommand command);
        Task<HaMessage> Receive();
    }
}