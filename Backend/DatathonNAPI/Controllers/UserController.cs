using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.DTO;
using DatathonNAPI.Interfaces;
using DatathonNAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace DatathonNAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService_)
        {
            userService = userService_;

        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> QuerySetter(QueryRequest query)
        {
            var response = await userService.GetUsers(query.page, query.take);
            return Ok(response);
        }
        [HttpPost]
        [Route("/Filter")]
        public async Task<ActionResult> QuerySetter(FilterInput newFilter)
        {
            var res = userService.SetFilter(newFilter);
            return NoContent();
        }
    }
}