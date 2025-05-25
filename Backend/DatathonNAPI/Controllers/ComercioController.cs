using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.DTO;
using DatathonNAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DatathonNAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComercioController : ControllerBase
    {
        private readonly IComercioService comercioService;

        public ComercioController(IComercioService comercioService_)
        {
            comercioService = comercioService_;

        }

        [HttpGet]
        public async Task<ActionResult<Top5Values>> GetPercentage()
        {
            var res = await comercioService.TopComercios();
            return Ok(res);
        }
    }
}