using Microsoft.AspNetCore.Mvc;
using Pharma_Project_2023.Objects;
using Pharma_Project_2023.Objects.Interfaces;
using Pharma_Project_2023.Objects.Models;
using Newtonsoft;
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

        [HttpGet]
        public async Task<JsonResult> GetPharmacies()
        {
            List<Pharmacy> results = await _pharmacyService.GetPharmacies();

            return new JsonResult(results);
        }

        [HttpGet("GetPharmacyById/{pharmacyId}")]
        public async Task<JsonResult> GetPharmacyById(int pharmacyId)
        {
            Pharmacy? result = await _pharmacyService.GetPharmacyById(pharmacyId);

            return new JsonResult(result);
        }

        [HttpPost("SavePharmacy/{pharmacy}")]
        public async Task<JsonResult> SavePharmacy(Pharmacy pharmacy)
        {
            await _pharmacyService.SavePharmacy(pharmacy);

            return new JsonResult(pharmacy);
        }

        [HttpGet("GetStates")]
        public async Task<JsonResult> GetStates()
        {
            List<State> results = await _pharmacyService.GetStates();

            return new JsonResult(results);
        }

    }
}
