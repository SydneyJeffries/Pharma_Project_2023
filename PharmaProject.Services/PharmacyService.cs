using PharmaProject.Objects.Models;
using PharmaProject.Objects;
using Microsoft.EntityFrameworkCore;
using PharmaProject.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;

namespace PharmaProject.Services
{
    public class PharmacyService : IPharmacyService { 

        private readonly AppSettingsDbContext _dbContext;

        private readonly TimeSpan _defaultCacheDuration = TimeSpan.FromMinutes(30);

        private readonly IMemoryCache _cache;

        public PharmacyService(AppSettingsDbContext context, IMemoryCache cache)
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

        public async Task<List<Pharmacy>> GetPharmacyListAsync()
        {
            //check if data is in cache
            if (_cache.TryGetValue("GetPharmacyList", out List<Pharmacy> data))
            {
                return data;
            }

            data =  await _dbContext.Pharmacy.ToListAsync();

            _cache.Set("GetPharmacyList", data, GetDefaultCacheOptions());

            return data;
        }

        public async Task<Pharmacy?> GetPharmacyByIdAsync(int pharmacyId)
        {
            return await _dbContext.Pharmacy.FirstOrDefaultAsync(x => x.PharmacyId == pharmacyId);
        }

        public async Task<Pharmacy> SavePharmacyAsync(Pharmacy pharmacy)
        {
            pharmacy.UpdatedDate = DateTimeOffset.Now;
            _dbContext.Update(pharmacy);
            await _dbContext.SaveChangesAsync();

            _cache.Remove("GetPharmacyList");

            return pharmacy;
        }

      
    }
}
