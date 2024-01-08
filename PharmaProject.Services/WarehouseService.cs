using PharmaProject.Objects.Models;
using PharmaProject.Objects;
using Microsoft.EntityFrameworkCore;
using PharmaProject.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;

namespace PharmaProject.Services
{
    public class WarehouseService : IWarehouseService { 

        private readonly AppSettingsDbContext _dbContext;

        public WarehouseService(AppSettingsDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Warehouse>> GetWarehouseListAsync()
        {

            var data =  await _dbContext.Warehouse.ToListAsync();

            return data;
        }
    }
}
