using Microsoft.AspNetCore.Mvc;
using PharmaProject.Services.Interfaces;
using PharmaProject.Objects.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using PharmaProject.Services.Utilities.Interfaces;

namespace PharmaProject.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WarehouseController : ControllerBase
    {
        private readonly ILogger<DeliveryController> _logger;
        private readonly IWarehouseService _warehouseService;

        public WarehouseController(IWarehouseService warehouseService , ILogger<DeliveryController> logger)
        {
            _warehouseService = warehouseService;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> GetWarehouseList()
        {
            try
            {
                List<Warehouse> warehouses  = await _warehouseService.GetWarehouseList();

                return  Ok(warehouses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }


    }
}
