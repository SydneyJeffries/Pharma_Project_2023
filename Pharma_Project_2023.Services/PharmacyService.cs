using Pharma_Project_2023.Objects.Models;
using Pharma_Project_2023.Objects.Interfaces;
using Pharma_Project_2023.Objects;
using Microsoft.EntityFrameworkCore;
using Pharma_Project_2023.Services.Interfaces;

namespace Pharma_Project_2023.Services
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
            pharmacy.UpdatedDate = DateTime.Now;
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
