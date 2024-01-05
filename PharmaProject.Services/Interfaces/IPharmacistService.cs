
using PharmaProject.Services.Utilities.Interfaces;
using PharmaProject.Objects.Models;

namespace PharmaProject.Services.Interfaces
{
    public interface IPharmacistService
    {
        Task<List<Pharmacist>> GetPharmacistListForPharmacy(int pharmacyId);
    }
}