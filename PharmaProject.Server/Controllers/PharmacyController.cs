using Microsoft.AspNetCore.Mvc;
using PharmaProject.Services.Interfaces;
using PharmaProject.Objects.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace PharmaProject.Server.Controllers
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

        [HttpGet]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> GetPharmacyList()
        {
            try
            {
                List<Pharmacy> results = await _pharmacyService.GetPharmacyListAsync();

                return  Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{pharmacyId}")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> GetPharmacyById(int pharmacyId)
        {
            try
            {
                Pharmacy? result = await _pharmacyService.GetPharmacyByIdAsync(pharmacyId);
                return result == null ? NotFound() : Ok(result);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> SavePharmacy(Pharmacy pharmacy)
        {
            try
            {
                Pharmacy result = await _pharmacyService.SavePharmacyAsync(pharmacy);

                return Ok(result);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
     
        }

    

    }
}
