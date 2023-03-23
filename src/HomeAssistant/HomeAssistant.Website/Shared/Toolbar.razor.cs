using HomeAssistant.Common.Interfaces;
using HomeAssistant.Domain;
using HomeAssistant.Domain.States;
using Microsoft.AspNetCore.Components;
using Observr;
using System.Security.Cryptography.Xml;

namespace HomeAssistant.Website.Shared
{
    public partial class Toolbar
    {
        [Parameter] public string Height { get; set; }
    }
}
