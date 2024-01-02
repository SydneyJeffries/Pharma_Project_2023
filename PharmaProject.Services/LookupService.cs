using PharmaProject.Objects.Models;
using PharmaProject.Objects;
using Microsoft.EntityFrameworkCore;
using PharmaProject.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;
using PharmaProject.Services.Utilities.Interfaces;
using PharmaProject.Services.Utilities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PharmaProject.Services
{
    public class LookupService : ILookupService
    {
        private readonly AppSettingsDbContext _dbContext;

        private readonly TimeSpan _defaultCacheDuration = TimeSpan.FromMinutes(30);

        private readonly IMemoryCache _cache;

        public LookupService(AppSettingsDbContext context, IMemoryCache cache)
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

        public async Task<List<State>> GetStateList()
        {
            if (_cache.TryGetValue("GetStateList", out List<State> data))
            {
                return data;
            }

            data = await _dbContext.States.ToListAsync();

            _cache.Set("GetStateList", data, GetDefaultCacheOptions());

            return data;

        }

        public async Task<List<Drug>> GetDrugList()
        {
            if (_cache.TryGetValue("GetDrugsList", out List<Drug> data))
            {
                return data;
            }

            data = await _dbContext.DrugsRef.ToListAsync();

            _cache.Set("GetDrugsList", data, GetDefaultCacheOptions());

            return data;

        }



    }
}
