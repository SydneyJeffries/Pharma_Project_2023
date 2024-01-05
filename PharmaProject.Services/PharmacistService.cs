using PharmaProject.Objects.Models;
using PharmaProject.Objects;
using Microsoft.EntityFrameworkCore;
using PharmaProject.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;

namespace PharmaProject.Services
{
    public class PharmacistService : IPharmacistService
    {

        private readonly AppSettingsDbContext _dbContext;

        public PharmacistService(AppSettingsDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Pharmacist>> GetPharmacistListForPharmacy(int pharmacyId)
        {

            var data = await _dbContext.Pharmacist.Where(x => x.PharmacyId == pharmacyId && x.Active == true).OrderBy(x=> x.DateOfHire).ToListAsync();

            return data;
        }


    }
}
