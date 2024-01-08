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

        public PharmacyService(AppSettingsDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Pharmacy>> GetPharmacyListAsync()
        {
            var data =  await _dbContext.Pharmacy.ToListAsync();

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

            return pharmacy;
        }   
    }
}
