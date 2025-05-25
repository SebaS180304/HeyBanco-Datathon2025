using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using DatathonNAPI.DTO;
using DatathonNAPI.Interfaces;
using DatathonNAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DatathonNAPI.Services
{
    public class UserService : IUserService
    {
        private readonly HeyBContext context;
        public UserService(HeyBContext _context)
        {
            context = _context;
        }

        public async Task<List<User>> GetUsers(QueryRequest query)
        {
            var data = context.BaseClientesFinals.AsQueryable();
            if (query.filter.ciudad != 0)
            {
                data = data.Where(x => x.IdEstado == query.filter.ciudad);
            }
            if (query.filter.ActividadEmpresarial != "")
            {
                data = data.Where(x => x.ActividadEmpresarial == query.filter.ActividadEmpresarial);
            }
            if (!(query.filter.gender.Men && query.filter.gender.Female && query.filter.gender.Undefinded))
            {
                if (!query.filter.gender.Men)
                {
                    data = data.Where(x => x.Genero != "M");
                }
                if (!query.filter.gender.Female)
                {
                    data = data.Where(x => x.Genero != "F");
                }
                if (!query.filter.gender.Undefinded)
                {
                    data = data.Where(x => x.Genero != " ");
                }
            }
            if (!(query.filter.Tperson.ActividadE && query.filter.Tperson.SinActividadE))
            {
                data = query.filter.Tperson.ActividadE ? data : data.Where(x => x.ActividadEmpresarial == "Persona Fisica Con Actividad Empresarial");
                data = query.filter.Tperson.SinActividadE ? data : data.Where(x => x.ActividadEmpresarial == "Persona Fisica Sin Actividad Empresarial");
            }
            var res = await data.AsNoTracking().
                            Skip((query.page - 1) * query.take).
                            Take(query.take).
                            ToListAsync();
            var QUERYINFO = await data.ToListAsync();
            return res.Select(x => new User
            {
                Id = x.Id,
                FechaNacimiento = x.FechaNacimiento,
                FechaAlta = x.FechaAlta,
                IdMunicipio = x.IdMunicipio,
                IdEstado = x.IdEstado,
                TipoPersona = x.TipoPersona,
                Genero = x.Genero,
                ActividadEmpresarial = x.ActividadEmpresarial,
            }).ToList();



        }

    }
}