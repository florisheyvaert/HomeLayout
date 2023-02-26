using AutoMapper;
using HomeAssistant.Application.Bus.Models;
using Observr;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeAssistant.Application.Bus.Strategies
{
    internal abstract class BaseStrategy
    {
        public abstract MessageType Type { get; }

        public abstract Task Execute(string content);
    }

}