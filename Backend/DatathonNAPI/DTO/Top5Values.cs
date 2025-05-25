using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatathonNAPI.DTO
{
    public class Top5Values
    {
        public List<Value> values { get; set; } = new List<Value>();
    }

    public class Value {
        public string name { get; set; } = "";
        public float percent { get; set; }
        public double value { get; set; }
        
    }
}