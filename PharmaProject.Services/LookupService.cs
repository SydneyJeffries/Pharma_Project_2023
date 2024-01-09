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

        private readonly SemaphoreSlim _cacheLock = new SemaphoreSlim(1);

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

        public async Task<List<State>> GetStateListAsync()
        {
            try
            {
                //check if data is in cache
                if (_cache.TryGetValue("GetStateList", out List<State> data))
                {
                    return data;
                }
                // lock so only request can update cache at a time to handle race condition.
                await _cacheLock.WaitAsync();
                data = await _dbContext.State.ToListAsync();
                _cache.Set("GetStateList", data, GetDefaultCacheOptions());

                return data;
            }
            finally
            {
                // lock is released
                _cacheLock.Release();
            }
        }

        public async Task<List<Drug>> GetDrugListAsync()
        {

            var data = await _dbContext.Drug.ToListAsync();

            return data;
        }

    }
}
