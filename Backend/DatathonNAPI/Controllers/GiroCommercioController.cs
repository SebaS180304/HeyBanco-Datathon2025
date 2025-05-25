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
    public class GiroCommercioController : ControllerBase
    {
        private readonly IGiroComercioService giroCommercioservice;

        public GiroCommercioController(IGiroComercioService giroCommercioservice_)
        {
            giroCommercioservice = giroCommercioservice_;

        }

        [HttpGet]
        public async Task<ActionResult<Top5Values>> GetPercentage()
        {
            var res = await giroCommercioservice.TopGiros();
            return Ok(res);
        }
    }
}