using PharmaProject.Objects.Models;


namespace PharmaProject.Services.Interfaces
{
    public interface IPharmacyService
    {
        Task<Pharmacy?> GetPharmacyById(int id);
        Task<List<Pharmacy>> GetPharmacyList();
        Task<Pharmacy> SavePharmacy(Pharmacy pharmacy);

    }
}
