using Microsoft.AspNetCore.Mvc;
using PharmaProject.Services.Interfaces;
using PharmaProject.Objects.Models;

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
        public async Task<IActionResult> GetPharmacyList()
        {
            try
            {
                List<Pharmacy> results = await _pharmacyService.GetPharmacyList();

                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{Id}")]
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

        [HttpPost]
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

        [HttpGet("GetStateList")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetStateList()
        {
            try
            {
                List<State> results = await _pharmacyService.GetStateList();

                return  Ok(results);

            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        
        }

    }
}
