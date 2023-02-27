using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Domain.States
{
    public class MediaPlayerState : BaseState
    {
        public bool Muted { get; set; }
        public decimal Volume { get; set; }
        public bool Play { get; set; }
        public decimal SeekPosition { get; set; }
    }
}
