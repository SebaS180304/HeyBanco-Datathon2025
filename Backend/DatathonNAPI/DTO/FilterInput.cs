using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatathonNAPI.DTO
{
    public class FilterInput
    {
        public int ciudad { get; set; }
        public Gender gender { get; set; } = new Gender();
        public PersonT Tperson { get; set; } = new PersonT();
        public string ActividadEmpresarial { get; set; } = "";
    }

    public class Gender {
        public bool Men { get; set; }
        public bool Female { get; set; }
        public bool Undefinded { get; set; }
    }

    public class PersonT {
        public bool ActividadE { get; set; }
        public bool SinActividadE { get; set; }

    }
}

