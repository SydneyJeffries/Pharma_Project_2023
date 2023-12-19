using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pharma_Project_2023.Core.Objects;


namespace Pharma_Project_2023.Core.Interfaces
{
    public interface IPharmacyService
    {
        Task<Pharmacy?> GetPharmacyById(int id);
        Task<List<Pharmacy>> GetPharmacies();
        Task<Pharmacy> UpdatePharmacy(Pharmacy pharmacy);
        Task<List<State>> GetStates();
    }
}
