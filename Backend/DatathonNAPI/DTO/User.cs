using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatathonNAPI.DTO
{
    public class User
    {
        public string? Id { get; set; }

        public DateOnly? FechaNacimiento { get; set; }

        public DateOnly? FechaAlta { get; set; }

        public int? IdMunicipio { get; set; }

        public int? IdEstado { get; set; }

        public string? TipoPersona { get; set; }

        public string? Genero { get; set; }

        public string? ActividadEmpresarial { get; set; }
    }
}