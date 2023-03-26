using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Domain.States
{
    public class BaseState
    {
        public string EntityId { get; set; }

        public bool Value { get; set; }

        public Dictionary<string, object> Attributes { get; set; }

        public string FriendlyName { get => GetAttribute("friendly_name"); }

        public BaseState(BaseState baseState)
        {
            EntityId = baseState.EntityId;
            Attributes = baseState.Attributes;
            Value = baseState.Value;
        }

        public BaseState()
        {

        }

        public string GetAttribute(string key)
        {
            if (Attributes is object && Attributes.TryGetValue(key, out var value))
                return value?.ToString() ?? string.Empty;
            else
                return string.Empty;
        }

        public decimal GetAttributeDecimal(string key)
        {
            var attribute = GetAttribute(key);
            if (decimal.TryParse(attribute, out var result))
                return result;

            return 0;
        }

        protected void SetAtttribute(string key, object value)
        {
            if (Attributes.ContainsKey(key))
                Attributes[key] = value;
            else
                Attributes.Add(key, value);
        }
    }
}
