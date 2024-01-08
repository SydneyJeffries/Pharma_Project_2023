using PharmaProject.Objects.Models;
using PharmaProject.Objects;
using Microsoft.EntityFrameworkCore;
using PharmaProject.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;
using PharmaProject.Services.Utilities.Interfaces;
using PharmaProject.Services.Utilities;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System;

namespace PharmaProject.Services
{
    public class DeliveryService : IDeliveryService
    {

        private readonly AppSettingsDbContext _dbContext;


        public DeliveryService(AppSettingsDbContext context, IMemoryCache cache)
        {
            _dbContext = context;
        }

        public async Task<IPagedResult<Delivery>> GetPagedDeliveryListAsync(int pageNumber, int pageSize, int pharmacyId, int warehouseId)
        {

            var startRow = pageNumber * pageSize;

            var query = from delivery in _dbContext.Delivery
                        join pharmacy in _dbContext.Pharmacy on delivery.PharmacyId equals pharmacy.PharmacyId into p
                        from pharmacy in p
                        join warehouse in _dbContext.Warehouse on delivery.WarehouseId equals warehouse.WarehouseId into w
                        from warehouse in w
                        where (warehouseId == 0 || delivery.WarehouseId == warehouseId) &&
                              (pharmacyId == 0 || delivery.PharmacyId == pharmacyId) &&
                              delivery.Active
                        orderby delivery.DeliveryDate descending
                        select new Delivery
                        {
                            DeliveryId = delivery.DeliveryId,
                            DeliveryDate = delivery.DeliveryDate,
                            WarehouseId = delivery.WarehouseId,
                            PharmacyId = delivery.PharmacyId,
                            DrugId = delivery.DrugId,
                            UnitCount = delivery.UnitCount,
                            UnitPrice = delivery.UnitPrice,
                            TotalPrice = delivery.TotalPrice,
                            Active = delivery.Active,
                            UpdatedDate = delivery.UpdatedDate,
                            CreatedDate = delivery.CreatedDate,
                            CreatedBy = delivery.CreatedBy,
                            UpdatedBy = delivery.UpdatedBy,
                            WarehouseName = warehouse.Name,
                            PharmacyName = pharmacy.Name,
                        };

            var entities = await query
                .Skip(startRow)
                .Take(pageSize)
                .ToListAsync();

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


        public async Task<Delivery> DeleteDeliveryAsync(Delivery delivery)
        {
            delivery.Active = false;
            delivery.UpdatedDate = DateTimeOffset.Now;
            delivery.UpdatedBy = "Sydney.Jeffriess@gmail.com";
            _dbContext.Update(delivery);
            await _dbContext.SaveChangesAsync();

            return delivery;
        }

        public async Task<Delivery> SaveDeliveryAsync(Delivery delivery)
        {
            //save new record
            if (delivery.DeliveryId == 0)
            {
                delivery.CreatedDate = DateTimeOffset.Now;
                delivery.CreatedBy = "Sydney.Jeffriess@gmail.com";
                delivery.TotalPrice = delivery.UnitPrice * delivery.UnitCount;
                _dbContext.Delivery.Add(delivery);
                await _dbContext.SaveChangesAsync();
            } //update exisiting 
            else
            {
                delivery.UpdatedDate = DateTimeOffset.Now;
                delivery.UpdatedBy = "Sydney.Jeffriess@gmail.com";
                delivery.TotalPrice = delivery.UnitPrice * delivery.UnitCount;
                _dbContext.Update(delivery);
                await _dbContext.SaveChangesAsync();
            }

            return delivery;
        }



    }
}
