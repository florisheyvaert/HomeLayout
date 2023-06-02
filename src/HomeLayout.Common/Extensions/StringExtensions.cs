using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Common.Extensions
{
    public static class StringExtensions
    {
        public static byte[] ToBytes(this string value)
        {
            return Encoding.ASCII.GetBytes(value);
        }

        public static string ToSnakeCase(this string str)
        {
            return string.Concat(str.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToLower();
        }
    }
}
