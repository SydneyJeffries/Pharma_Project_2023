using Microsoft.AspNetCore.Mvc;
using PharmaProject.Services.Interfaces;
using PharmaProject.Objects.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace PharmaProject.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PharmacistController : ControllerBase
    {
        private readonly ILogger<PharmacistController> _logger;
        private readonly IPharmacistService _pharmacistService;

        public PharmacistController(IPharmacistService pharmacistService , ILogger<PharmacistController> logger)
        {
            _pharmacistService = pharmacistService;
            _logger = logger;
        }

        [HttpGet("{pharmacyId}")]
        [ProducesResponseType<Pharmacist>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> GetPharmacistListForPharmacyId(int pharmacyId)
        {
            try
            {
                List<Pharmacist> results = await _pharmacistService.GetPharmacistListForPharmacy(pharmacyId);

                return  Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

    

    }
}
