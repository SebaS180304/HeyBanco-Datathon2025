using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatathonNAPI.DTO
{
    public class LogInResponse
    {
        public string? Name { get; set; }
        public string? Token { get; set; } = string.Empty;
        public int TimeExpires { get; set; } = 0;

    }
}