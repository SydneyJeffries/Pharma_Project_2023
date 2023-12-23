using PharmaProject.Objects.Models;
using PharmaProject.Objects.Interfaces;
using PharmaProject.Objects;
using Microsoft.EntityFrameworkCore;
using PharmaProject.Services.Interfaces;

namespace PharmaProject.Services
{
    public class PharmacyService : IPharmacyService { 

        private readonly AppSettingsDbContext _dbContext;

        public PharmacyService(AppSettingsDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Pharmacy>> GetPharmacyList()
        {
            return await _dbContext.Pharmacy.ToListAsync();
        }

        public async Task<Pharmacy?> GetPharmacyById(int pharmacyId)
        {
            return await _dbContext.Pharmacy.FirstOrDefaultAsync(x => x.PharmacyId == pharmacyId);
        }

        public async Task<Pharmacy> SavePharmacy(Pharmacy pharmacy)
        {
            pharmacy.UpdatedDate = DateTimeOffset.Now;
            _dbContext.Update(pharmacy);
            await _dbContext.SaveChangesAsync();
            return pharmacy;
        }

        public async Task<List<State>> GetStateList()
        {
            return await _dbContext.State.ToListAsync();
        }

    }
}
