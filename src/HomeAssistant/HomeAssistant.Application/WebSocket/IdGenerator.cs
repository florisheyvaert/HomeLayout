using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.WebSocket
{
    public static class IdGenerator
    {
		private static int _id;

		public static int Id
		{
			get { return ++_id; }
		}
	}
}
