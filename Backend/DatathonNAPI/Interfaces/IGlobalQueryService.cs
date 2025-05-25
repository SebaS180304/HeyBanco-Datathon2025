using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.DTO;
using DatathonNAPI.Models;

namespace DatathonNAPI.Interfaces
{
    public interface IGlobalQueryService
    {
        public FilterInput filter { get; set; }
        public IQueryable<BaseClientesFinal>? GetQuery(HeyBContext context);
    }
}