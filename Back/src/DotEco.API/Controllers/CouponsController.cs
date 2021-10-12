using System.Threading.Tasks;
using AutoMapper;
using DotEco.Domain;
using DotEco.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotEco.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDotEcoRepository _repo;

        public CouponsController(IDotEcoRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
            try
            {
                var coupons = await _repo.GetAllCouponsAsync();

                var results = _mapper.Map<Coupons[]>(coupons);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        [HttpGet("{CouponsId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int CouponsId)
        {
            try
            {
                var coupons = await _repo.GetCouponsAsyncById(CouponsId);

                var results = _mapper.Map<CouponsDto>(coupons);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(CouponsDto model)
        {
            try
            {
                var coupons = _mapper.Map<Coupons>(model);

                _repo.Add(coupons);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/coupons/{model.Id}", _mapper.Map<CouponsDto>(coupons));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco Dados Falhou {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{CouponsId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Put(int CouponsId, CouponsDto model)
        {
            try
            {
                var coupons = await _repo.GetCouponsAsyncById(CouponsId);
                if (coupons == null) return NotFound();


                _mapper.Map(model, coupons);

                _repo.Update(coupons);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/coupons/{model.Id}", _mapper.Map<CouponsDto>(coupons));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{CouponsId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Delete(int CouponsId)
        {
            try
            {
                var coupons = await _repo.GetAssociationAsyncById(CouponsId);
                if (coupons == null) return NotFound();

                _repo.Delete(coupons);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

            return BadRequest();
        }
    }
}