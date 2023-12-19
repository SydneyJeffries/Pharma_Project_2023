using Microsoft.AspNetCore.Mvc;
using Pharma_Project_2023.Core;
using Pharma_Project_2023.Core.Interfaces;
using Pharma_Project_2023.Core.Objects;

namespace Pharma_Project_2023.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PharmacyController : ControllerBase
    {
        private readonly ILogger<PharmacyController> _logger;
        private IPharmacyService _pharmacyService { get; set; }

        public PharmacyController(ILogger<PharmacyController> logger)
        {

            _logger = logger;
        }

        //public async Task<List<Pharmacy>> GetPharmacies()
        //{
        //   List<Pharmacy> results = await _pharmacyService.GetPharmacies();

        //}

        //public async Task<Pharmacy?> GetPharmacyById(int pharmacyId)
        //{
        //    Pharmacy result = await _pharmacyService.GetPharmacyById(pharmacyId);
        //}

        //public async Task<Pharmacy> UpdatePharmacy(Pharmacy pharmacy)
        //{     

        //    await _pharmacyService.UpdatePharmacy(pharmacy);

        //}

        //public async Task<List<State>> GetStates()
        //{
        //    List<State> results = await _pharmacyService.GetStates();
        //}

    }
}
