using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;
using DatathonNAPI.DTO;

namespace DatathonNAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogInController : Controller
    {
        private readonly ILogIn logInService;

        public LogInController(ILogIn logInSS)
        {
            logInService = logInSS;

        }

        [HttpPost]
        public async Task<ActionResult<LogInResponse>> LogIn( LogInRequest logInRequest)
        {
            var response = await logInService.Authentification(logInRequest);
            if (response is null) return Unauthorized();
            return Ok(response);
        }
    }
}