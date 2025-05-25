using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatathonNAPI.DTO
{
    public class QueryRequest
    {
        public int page { get; set; }
        public int take { get; set; }
        public FilterInput filter { get; set; } = new FilterInput();
    }
}