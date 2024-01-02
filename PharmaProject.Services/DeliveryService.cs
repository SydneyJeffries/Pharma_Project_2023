using PharmaProject.Objects.Models;
using PharmaProject.Objects;
using Microsoft.EntityFrameworkCore;
using PharmaProject.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;
using PharmaProject.Services.Utilities.Interfaces;
using PharmaProject.Services.Interfaces;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using PharmaProject.Services.Utilities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PharmaProject.Services
{
    public class DeliveryService : IDeliveryService
    {

        private readonly AppSettingsDbContext _dbContext;


        public DeliveryService(AppSettingsDbContext context, IMemoryCache cache)
        {
            _dbContext = context;
        }

        public async Task<IPagedResult<Delivery>> GetPagedDeliveryList(int pageNumber, int pageSize, int? pharmacyId = null, int? warehouseId = null)
        {

            var startRow = pageNumber * pageSize;

            IQueryable<Delivery> query = _dbContext.Deliveries;


            if (pharmacyId.HasValue && warehouseId.HasValue)
            {
                query =  query.Where(d => d.WarehouseId == warehouseId && d.PharmacyId == pharmacyId && d.Active == true);
            }
            else if (warehouseId.HasValue)
            {
                query = query.Where(d => d.WarehouseId == warehouseId && d.Active == true);
            }
            else if (pharmacyId.HasValue)
            {
                query = query.Where(d => d.PharmacyId == pharmacyId && d.Active == true);
            }
            else
            {
                query = query.Where(x => x.Active == true);
            }

            var entities = query
               .AsNoTracking()
               .Skip(startRow)
               .Take(pageSize)
               .ToList();


            var totalCount = await query.CountAsync();

            var pagedResult = new PagedResult<Delivery>
            {
                CurrentPage = pageNumber,
                PageSize = pageSize,
                TotalCount = await query.CountAsync(),
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Data = entities,
            };

            return pagedResult;
        }


        //public async Task<List<Delivery>> GetDeliveryListByPharmacyId(int pharmacyId)
        //{
        //    var deliveryListByPharmacy = await _dbContext.Deliveries
        //        .Where(d => d.PharmacyId == pharmacyId)
        //        .ToListAsync();

        //    return deliveryListByPharmacy;
        //}


        //public async Task<List<Delivery>> GetDeliveryListByWarehouseId(int warehouseId)
        //{
        //    var deliveryListByWarehouse = await _dbContext.Deliveries
        //        .Where(d => d.WarehouseId == warehouseId)
        //        .ToListAsync();
        //    return deliveryListByWarehouse;

        //}

        public async Task<Delivery> DeleteDelivery(Delivery delivery)
        {
            delivery.Active = false;
            delivery.UpdatedDate = DateTimeOffset.Now;
            delivery.UpdatedBy = "Sydney.Jeffriess@gmail.com";
            _dbContext.Update(delivery);
            await _dbContext.SaveChangesAsync();

            return delivery;
        }


        public async Task<Delivery> SaveDelivery(Delivery delivery)
        {

            if (delivery.DeliveryId == 0)
            {
                delivery.CreatedDate = DateTimeOffset.Now;
                delivery.CreatedBy = "Sydney.Jeffriess@gmail.com";
                _dbContext.Deliveries.Add(delivery);
                var result = await _dbContext.SaveChangesAsync();
                delivery.DeliveryId = result;
            }
            else
            {
                delivery.UpdatedDate = DateTimeOffset.Now;
                delivery.UpdatedBy = "Sydney.Jeffriess@gmail.com";
                _dbContext.Update(delivery);
                await _dbContext.SaveChangesAsync();
            }

            return delivery;
        }



    }
}
