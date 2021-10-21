
using AutoMapper;
using DotEco.Persistence;
using System.Threading.Tasks;
using DotEco.Application.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace DotEco.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionDatasController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDotEcoRepository _repo;

        public CollectionDatasController(IDotEcoRepository repo, IMapper mapper)
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
                var associations = await _repo.GetAllCollectionDataAsync();

                var results = _mapper.Map<CollectionDataDto[]>(associations);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        [HttpGet("{CollectionDataId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(int CollectionDataId)
        {
            try
            {
                var collectionData = await _repo.GetCollectionDataAsyncById(CollectionDataId);

                var results = _mapper.Map<CollectionDataDto>(collectionData);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(CollectionDataPostDto model)
        {
            try
            {
                var collectionData = _mapper.Map<CollectionDataPostDto>(model);

                _repo.Add(collectionData);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/collectiondata/{model.Id}", _mapper.Map<CollectionDataPostDto>(collectionData));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco Dados Falhou {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{CollectionDataId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Put(int CollectionDataId, CollectionDataPostDto model)
        {
            try
            {
                var collectionData = await _repo.GetCollectionDataAsyncById(CollectionDataId);
                if (collectionData == null) return NotFound();


                _mapper.Map(model, collectionData);

                _repo.Update(collectionData);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/collectiondata/{model.Id}", _mapper.Map<CollectionDataPostDto>(collectionData));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{CollectionDataId}")]
        [AllowAnonymous]
        public async Task<IActionResult> Delete(int CollectionDataId)
        {
            try
            {
                var collectionData = await _repo.GetCollectionDataAsyncById(CollectionDataId);
                if (collectionData == null) return NotFound();

                _repo.Delete(collectionData);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok(new { message = "Coleta cancelada" });
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