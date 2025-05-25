using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.DTO;

namespace DatathonNAPI.Interfaces
{
    public interface IUserService
    {
        public Task<List<User>> GetUsers(QueryRequest query);
    }
}