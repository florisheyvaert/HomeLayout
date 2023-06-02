using HomeLayout.Common.Interfaces;
using HomeLayout.Domain;
using HomeLayout.Domain.States;
using Microsoft.AspNetCore.Components;
using Observr;
using System.Security.Cryptography.Xml;

namespace HomeLayout.Website.Shared
{
    public partial class Toolbar
    {
        [Parameter] public string Height { get; set; }
    }
}
