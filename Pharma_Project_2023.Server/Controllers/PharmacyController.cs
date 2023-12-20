using Microsoft.AspNetCore.Mvc;
using Pharma_Project_2023.Objects.Interfaces;
using Pharma_Project_2023.Objects.Models;

namespace Pharma_Project_2023.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PharmacyController : ControllerBase
    {
        private readonly ILogger<PharmacyController> _logger;
        private readonly IPharmacyService _pharmacyService;

        public PharmacyController(IPharmacyService pharmacyService , ILogger<PharmacyController> logger)
        {
            _pharmacyService = pharmacyService;
            _logger = logger;
        }

        [HttpGet(Name ="GetPharmacies")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetPharmacies()
        {
            try
            {
                List<Pharmacy> results = await _pharmacyService.GetPharmacies();

                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetPharmacyById/{pharmacyId}")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetPharmacyById(int pharmacyId)
        {
            try
            {
                Pharmacy? result = await _pharmacyService.GetPharmacyById(pharmacyId);
                return result == null ? NotFound() : Ok(result);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("SavePharmacy/{pharmacy}")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SavePharmacy(Pharmacy pharmacy)
        {
            try
            {
                await _pharmacyService.SavePharmacy(pharmacy);

                return Ok(pharmacy);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
     
        }

        [HttpGet("GetStates")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetStates()
        {
            try
            {
                List<State> results = await _pharmacyService.GetStates();

                return new JsonResult(results);

            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        
        }

    }
}
