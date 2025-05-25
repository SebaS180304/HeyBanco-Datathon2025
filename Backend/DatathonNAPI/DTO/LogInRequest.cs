using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatathonNAPI.DTO
{
    public class LogInRequest
    {
        public string? UserID { get; set; }
        public string? Password { get; set; }
    }
}