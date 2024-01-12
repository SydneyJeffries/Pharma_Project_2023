
using PharmaProject.Services.Utilities.Interfaces;
using PharmaProject.Objects.Models;

namespace PharmaProject.Services.Interfaces
{
    public interface IWarehouseService
    {
        Task<List<Warehouse>> GetWarehouseListAsync();

    }
}