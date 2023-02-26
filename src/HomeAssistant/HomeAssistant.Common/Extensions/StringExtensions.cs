using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Common.Extensions
{
    public static class StringExtensions
    {
        public static byte[] ToBytes(this string value)
        {
            return Encoding.ASCII.GetBytes(value);
        }
    }
}
