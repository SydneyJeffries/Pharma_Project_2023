using Microsoft.AspNetCore.Mvc;
using PharmaProject.Services.Interfaces;
using PharmaProject.Objects.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using PharmaProject.Services.Utilities.Interfaces;
using PharmaProject.Services;

namespace PharmaProject.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LookupController : ControllerBase
    {
        private readonly ILogger<LookupController> _logger;
        private readonly ILookupService _LookupService;

        public LookupController(ILookupService LookupService , ILogger<LookupController> logger)
        {
            _LookupService = LookupService;
            _logger = logger;
        }

        [HttpGet("GetStateList")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> GetStateList()
        {
            try
            {
                List<State> results = await _LookupService.GetStateListAsync();

                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("GetDrugList")]
        [ProducesResponseType<Pharmacy>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json")]
        public async Task<IActionResult> GetDrugList()
        {
            try
            {
                List<Drug> results = await _LookupService.GetDrugListAsync();

                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }

        }

    }
}
