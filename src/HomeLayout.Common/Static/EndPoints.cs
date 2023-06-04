using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Common.Static
{
    public static class EndPoints
    {
        public const string Drawing_GetAll = "api/drawing/getall";
        public const string Drawing_Get = "api/drawing/{id}";
        public const string Drawing_Add = "api/drawing/";
        public const string Drawing_Update = "api/drawing";
        public const string Drawing_Delete = "api/drawing/{id}";

        public const string DrawingStyle_GetAll = "api/drawingstyle/getall";
        public const string DrawingStyle_Get = "api/drawingstyle/{id}";
        public const string DrawingStyle_Add = "api/drawingstyle/";
        public const string DrawingStyle_Update = "api/drawingstyle";
        public const string DrawingStyle_Delete = "api/drawingstyle/{id}";

        public static string Resolve(this string url, string replace, object replaceValue)
        {
            return url.Replace($"{{{replace}}}", replaceValue.ToString());
        }
    }
}
