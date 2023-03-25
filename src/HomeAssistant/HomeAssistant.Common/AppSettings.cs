using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Common
{
    public class AppSettings
    {
        public string HomeAssistantWebSocketUrl { get; set; }
        public string HomeAssistantWebApiUrl { get; set; }
        public string HomeAssistantAccessToken { get; set; }
    }
}
