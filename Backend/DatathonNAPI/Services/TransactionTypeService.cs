using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.DTO;
using DatathonNAPI.Interfaces;
using DatathonNAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DatathonNAPI.Services
{
    public class TransactionTypeService : ITransactionTypeService
    {
        public readonly IGlobalQueryService globalQueryService;
        public readonly HeyBContext context;
        public TransactionTypeService(IGlobalQueryService _globalQueryService, HeyBContext heyB)
        {
            globalQueryService = _globalQueryService;
            context = heyB;
        }
        public async Task<PercentageFD> GetPercentageFD()
        {
            var filter = globalQueryService.GetQuery(context);
            if (filter is null)
                return new PercentageFD();
            var ids = await filter.Select(x => x.Id).ToListAsync();
            var data = await context.BaseTransaccionesFinals.Where(x => ids.Contains(x.Id))
                                                            .GroupBy(x => x.TipoVenta)
                                                            .Select(x => new { TipoVenta = x.Key, Count = x.Count() })
                                                            .ToListAsync();

            float amount = 0;
            foreach (var dato in data)
            {
                amount += dato.Count;
            }
            float fisicaCount = data.FirstOrDefault(g => g.TipoVenta == "fisica")?.Count ?? 0;
            float digitalCount = data.FirstOrDefault(g => g.TipoVenta == "digital")?.Count ?? 0;
            var a = new PercentageFD
            {
                Fisica = amount == 0 ? 0 : fisicaCount / amount,
                Digital = amount == 0 ? 0 : digitalCount / amount
            };
            return a;
        }
    }
}