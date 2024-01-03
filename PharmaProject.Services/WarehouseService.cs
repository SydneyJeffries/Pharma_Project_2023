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

        private readonly TimeSpan _defaultCacheDuration = TimeSpan.FromMinutes(30);

        private readonly IMemoryCache _cache;

        public WarehouseService(AppSettingsDbContext context, IMemoryCache cache)
        {
            _dbContext = context;
            _cache = cache;
        }

        private MemoryCacheEntryOptions GetDefaultCacheOptions()
        {
            return new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = _defaultCacheDuration
            };
        }

        public async Task<List<Warehouse>> GetWarehouseList()
        {
            if (_cache.TryGetValue("GetWarehouseList", out List<Warehouse> data))
            {
                return data;
            }

            data =  await _dbContext.Warehouse.ToListAsync();

            _cache.Set("GetWarehouseList", data, GetDefaultCacheOptions());

            return data;
        }

   
    }
}
