using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeLayout.Application.Commands.Profiles
{
    internal class BaseProfile : Profile
    {
        protected string GetString(KeyValuePair<string, object> value)
        {
            return value.Value?.ToString() ?? string.Empty;
        }

        protected decimal GetDecimal(KeyValuePair<string, object> value)
        {
            if (decimal.TryParse(value.Value?.ToString(), out var output))
                return output;
            else
                return 0;
        }
    }
}
