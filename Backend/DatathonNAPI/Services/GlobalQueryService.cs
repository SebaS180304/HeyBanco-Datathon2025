using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.DTO;
using DatathonNAPI.Interfaces;
using DatathonNAPI.Models;

namespace DatathonNAPI.Services
{
    public class GlobalQueryService : IGlobalQueryService
    {
        public FilterInput filter { get; set; } = null!;

        public IQueryable<BaseClientesFinal>? GetQuery(HeyBContext context)
        {
            var data = context.BaseClientesFinals.AsQueryable();
            if (filter.ciudad != 0)
            {
                data = data.Where(x => x.IdEstado == filter.ciudad);
            }
            if (filter.ActividadEmpresarial != "")
            {
                data = data.Where(x => x.ActividadEmpresarial == filter.ActividadEmpresarial);
            }
            if (!(filter.gender.Men && filter.gender.Female && filter.gender.Undefinded))
            {
                if (!filter.gender.Men)
                {
                    data = data.Where(x => x.Genero != "M");
                }
                if (!filter.gender.Female)
                {
                    data = data.Where(x => x.Genero != "F");
                }
                if (!filter.gender.Undefinded)
                {
                    data = data.Where(x => x.Genero != " ");
                }
            }
            if (!(filter.Tperson.ActividadE && filter.Tperson.SinActividadE))
            {
                data = filter.Tperson.ActividadE ? data : data.Where(x => x.ActividadEmpresarial == "Persona Fisica Con Actividad Empresarial");
                data = filter.Tperson.SinActividadE ? data : data.Where(x => x.ActividadEmpresarial == "Persona Fisica Sin Actividad Empresarial");
            }
            return data;
        }
    }
}