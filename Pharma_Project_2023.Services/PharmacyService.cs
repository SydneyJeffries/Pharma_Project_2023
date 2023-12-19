using Pharma_Project_2023.Core.Objects;
using Pharma_Project_2023.Core.Interfaces;
using Pharma_Project_2023.Core;
using Microsoft.EntityFrameworkCore;

namespace Pharma_Project_2023.Services
{
    public class PharmacyService : IPharmacyService { 

        private readonly AppSettingsDbContext _dbContext;

        public PharmacyService(AppSettingsDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Pharmacy>> GetPharmacies()
        {
            return await _dbContext.Pharmacy.ToListAsync();
        }

        public async Task<Pharmacy?> GetPharmacyById(int pharmacyId)
        {
            return await _dbContext.Pharmacy.Where(x => x.PharmacyId == pharmacyId).FirstOrDefaultAsync();
        }

        public async Task<Pharmacy> UpdatePharmacy(Pharmacy pharmacy)
        {
            pharmacy.UpdatedDate = DateTimeOffset.Now;
            _dbContext.Update(pharmacy);
            await _dbContext.SaveChangesAsync();
            return pharmacy;
        }

        public async Task<List<State>> GetStates()
        {
            return await _dbContext.State.ToListAsync();
        }

    }
}
