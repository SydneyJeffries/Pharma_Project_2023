using Microsoft.AspNetCore.Mvc;
using PharmaProject.Services.Interfaces;
using PharmaProject.Objects.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using PharmaProject.Services.Utilities.Interfaces;

namespace PharmaProject.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeliveryController : ControllerBase
    {
        private readonly ILogger<DeliveryController> _logger;
        private readonly IDeliveryService _deliveryService;

        public DeliveryController(IDeliveryService deliveryService , ILogger<DeliveryController> logger)
        {
            _deliveryService = deliveryService;
            _logger = logger;
        }

        [HttpGet("{pageNumber}/{pageSize}/{pharmacyId}/{warehouseId}")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> GetPagedDeliveryList(int pageNumber = 0, int pageSize = 10, int pharmacyId = 0, int warehouseId = 0)
        {
            try
            {
               
                IPagedResult<Delivery> deliveries = await _deliveryService.GetPagedDeliveryListAsync(pageNumber, pageSize, pharmacyId, warehouseId);

                return  Ok(deliveries);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> SaveDelivery(Delivery delivery)
        {
            try
            {
                Delivery result = await _deliveryService.SaveDeliveryAsync(delivery);

                return Ok(result);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("DeleteDelivery")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> DeleteDelivery(Delivery delivery)
        {
            try
            {
                Delivery result = await _deliveryService.DeleteDeliveryAsync(delivery);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }



    }
}
