using PharmaProject.Objects.Models;
using PharmaProject.Objects;
using Microsoft.EntityFrameworkCore;
using PharmaProject.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.Generic;
using PharmaProject.Services.Utilities.Interfaces;
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

        public async Task<IPagedResult<Delivery>> GetPagedDeliveryList(int pageNumber, int pageSize, int pharmacyId, int warehouseId )
        {

            var startRow = pageNumber * pageSize;

            IQueryable<Delivery> query = _dbContext.Deliveries;

            query = query.Include(d => d.Pharmacy).Include(d => d.Warehouse);

            if (pharmacyId != 0 && warehouseId != 0)
            {
                query =  query.Where(d => d.WarehouseId == warehouseId && d.PharmacyId == pharmacyId && d.Active == true);
            }
            else if (warehouseId != 0)
            {
                query = query.Where(d => d.WarehouseId == warehouseId && d.Active == true);
            }
            else if (pharmacyId != 0)
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
                delivery.TotalPrice = delivery.UnitPrice * delivery.UnitCount;
                _dbContext.Deliveries.Add(delivery);
                 await _dbContext.SaveChangesAsync();
     
            }
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
