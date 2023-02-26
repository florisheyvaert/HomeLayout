using HomeAssistant.Domain.States;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Common.Interfaces
{
    public interface IHaService
    {
        Task SetLightState(LightState lightState);
    }
}
