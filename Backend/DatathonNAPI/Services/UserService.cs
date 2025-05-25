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
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;

namespace DatathonNAPI.Services
{
    public class UserService : IUserService
    {
        private readonly HeyBContext context;
        private readonly IGlobalQueryService globalQueryService;
        public UserService(HeyBContext _context, IGlobalQueryService globalQueryService_)
        {
            context = _context;
            globalQueryService = globalQueryService_;
        }

        public async Task<List<User>> GetUsers(int page, int take)
        {
            var data = globalQueryService.GetQuery(context);
            if (data is null)
                return new List<User>();
            var res = await data.AsNoTracking().
                            Skip((page - 1) * take).
                            Take(take).
                            ToListAsync();
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

        public bool SetFilter(FilterInput filter)
        {
            globalQueryService.filter = filter;
            return true;
        }

    }
}