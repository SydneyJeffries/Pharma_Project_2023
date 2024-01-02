
using PharmaProject.Services.Utilities.Interfaces;
using PharmaProject.Objects.Models;

namespace PharmaProject.Services.Interfaces
{
    public interface IDeliveryService
    {
        Task<IPagedResult<Delivery>> GetPagedDeliveryList(int pageNumber, int pageSize, int? pharmacyId, int? warehouseId);
        //Task<List<Delivery>> GetDeliveryListByPharmacyId(int pharmacyId);
        //Task<List<Delivery>> GetDeliveryListByWarehouseId(int warehouseId);
        Task<Delivery> SaveDelivery(Delivery Delivery);
        Task<Delivery> DeleteDelivery(Delivery Delivery);
    }
}