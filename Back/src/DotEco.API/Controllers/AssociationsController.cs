using AutoMapper;
using DotEco.Domain;
using DotEco.Persistence;
using System.Threading.Tasks;
using DotEco.Application.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace DotEco.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssociationsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDotEcoRepository _repo;

        public AssociationsController(IDotEcoRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var associations = await _repo.GetAllAssociationAsync();

                var results = _mapper.Map<AssociationDto[]>(associations);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        [HttpGet("{AssociationId}")]
        public async Task<IActionResult> Get(int AssociationId)
        {
            try
            {
                var association = await _repo.GetAssociationAsyncById(AssociationId);

                var results = _mapper.Map<AssociationDto>(association);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(AssociationDto model)
        {
            try
            {
                var association = _mapper.Map<Association>(model);

                _repo.Add(association);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/association/{model.Id}", _mapper.Map<AssociationDto>(association));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco Dados Falhou {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{AssociationId}")]
        public async Task<IActionResult> Put(int AssociationId, AssociationDto model)
        {
            try
            {
                var association = await _repo.GetAssociationAsyncById(AssociationId);
                if (association == null) return NotFound();


                _mapper.Map(model, association);

                _repo.Update(association);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/association/{model.Id}", _mapper.Map<AssociationDto>(association));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{AssociationId}")]
        public async Task<IActionResult> Delete(int AssociationId)
        {
            try
            {
                var association = await _repo.GetAssociationAsyncById(AssociationId);
                if (association == null) return NotFound();

                _repo.Delete(association);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok("Associação desvinculada");
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
