
using PharmaProject.Services.Utilities.Interfaces;
using PharmaProject.Objects.Models;
using PharmaProject.Services.Utilities;

namespace PharmaProject.Services.Interfaces
{
    public interface IDeliveryService
    {
        Task<IPagedResult<Delivery>> GetPagedDeliveryListAsync(PagingInfo pagingInfo, int pharmacyId, int warehouseId);
        Task<Delivery> SaveDeliveryAsync(Delivery Delivery);
        Task<Delivery> DeleteDeliveryAsync(Delivery Delivery);
    }
}