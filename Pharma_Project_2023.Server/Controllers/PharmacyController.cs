using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pharma_Project_2023.Server.Models;

namespace Pharma_Project_2023.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PharmacyController : ControllerBase
    {
        private readonly ILogger<PharmacyController> _logger;
        private readonly AppSettingsDbContext _dbContext;

        public PharmacyController(AppSettingsDbContext dbContext, ILogger<PharmacyController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        //public async  Task<IEnumerable<Pharmacy>> GetPharmacies()
        //{

        //    return await _dbContext.Pharmacy.(); 
        //}
 

      
    }
}
