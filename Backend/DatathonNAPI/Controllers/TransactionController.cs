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
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionTypeService transactionService;

        public TransactionController(ITransactionTypeService transactionService_)
        {
            transactionService = transactionService_;

        }

        [HttpGet]
        public async Task<ActionResult<PercentageFD>> GetPercentage()
        {
            var res = await transactionService.GetPercentageFD();
            return Ok(res);
        }
    }
}