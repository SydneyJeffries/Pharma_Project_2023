using PharmaProject.Objects.Models;


namespace PharmaProject.Services.Interfaces
{
    public interface IPharmacyService
    {
        Task<Pharmacy?> GetPharmacyByIdAsync(int id);
        Task<List<Pharmacy>> GetPharmacyListAsync();
        Task<Pharmacy> SavePharmacyAsync(Pharmacy pharmacy);

    }
}
