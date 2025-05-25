using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatathonNAPI.DTO;
using DatathonNAPI.Interfaces;
using DatathonNAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DatathonNAPI.Services
{
    public class ComercioService : IComercioService
    {
        private readonly HeyBContext context;
        private readonly IGlobalQueryService globalQueryService;
        public ComercioService(HeyBContext heyBContext, IGlobalQueryService globalQueryService_)
        {
            context = heyBContext;
            globalQueryService = globalQueryService_;
        }
        public async Task<Top5Values> TopComercios()
        {
            var filter = globalQueryService.GetQuery(context);
            if (filter is null)
                return new Top5Values();
            var ids = await filter.Select(x => x.Id).ToListAsync();
            var data = await context.BaseTransaccionesFinals.Where(x => ids.Contains(x.Id))
                                                            .GroupBy(x => x.Comercio)
                                                            .Select(x=> new { Comercio = x.Key, Monto_Total = x.Sum(t=>t.Monto) })
                                                            .ToListAsync();
            float amount = 0;
            foreach (var dato in data)
            {
                amount +=(float)( dato.Monto_Total ?? 0);
            }
            if (amount == 0)
            {
                return new Top5Values();
            }
            data = data.OrderByDescending(x => x.Monto_Total).ToList();
            var F = new Top5Values();
            int i = 0;
            foreach (var Monto in data)
            {

                if (i < 7)
                {
                    F.values.Add(new Value { name = Monto.Comercio ?? "", value = (double)(Monto.Monto_Total ?? 0), percent = (float)(Monto.Monto_Total ?? 0) / amount });
                }
                else if (i > 6)
                {
                    if (F.values.Count() < 8)
                    {
                        F.values.Add(new Value { name = "Otros" });
                    }
                    F.values[7].value += (double)(Monto.Monto_Total ?? 0);
                }
                 i++;
            }
            if (F.values.Count() > 7)
            {
                F.values[7].percent =(float) F.values[7].value / amount;
            }
            return F;
        }
        
    }
}