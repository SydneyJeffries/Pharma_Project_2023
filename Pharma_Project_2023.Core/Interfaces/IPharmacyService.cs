using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pharma_Project_2023.Objects.Models;


namespace Pharma_Project_2023.Objects.Interfaces
{
    public interface IPharmacyService
    {
        Task<Pharmacy?> GetPharmacyById(int id);
        Task<List<Pharmacy>> GetPharmacyList();
        Task<Pharmacy> SavePharmacy(Pharmacy pharmacy);
        Task<List<State>> GetStateList();
    }
}
