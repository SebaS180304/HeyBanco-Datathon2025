using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.DTO;

namespace DatathonNAPI.Interfaces
{
    public interface IComercioService
    {
        public Task<Top5Values> TopComercios();

    }
}