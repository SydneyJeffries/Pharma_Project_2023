using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PharmaProject.Objects.Models;


namespace PharmaProject.Services.Interfaces
{
    public interface IPharmacyService
    {
        Task<Pharmacy?> GetPharmacyById(int id);
        Task<List<Pharmacy>> GetPharmacyList();
        Task<Pharmacy> SavePharmacy(Pharmacy pharmacy);
        Task<List<State>> GetStateList();
    }
}
