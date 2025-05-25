using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.DTO;

namespace DatathonNAPI.Interfaces
{
    public interface ITransactionTypeService
    {
        public Task<PercentageFD> GetPercentageFD();
    }
}