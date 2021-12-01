
using AutoMapper;
using DotEco.Persistence;
using System.Threading.Tasks;
using DotEco.Application.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using DotEco.Domain;
using DotEco.Application.Contracts;
using Microsoft.AspNetCore.Hosting;
using System;
using DotEco.Persistence.Models;
using DotEco.API.Extensions;

namespace DotEco.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CollectionDatasController : ControllerBase
    {
        private readonly ICollectionDataService _collectionDataService;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IAccountService _accountService;

        public CollectionDatasController(ICollectionDataService collectionDataService,
                                 IWebHostEnvironment hostEnvironment,
                                 IAccountService accountService)
        {
            _hostEnvironment = hostEnvironment;
            _accountService = accountService;
            _collectionDataService = collectionDataService;
        }

        [HttpGet]
        [Authorize(Roles = "Cliente2, Associacao, Administrador")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var collectionDatas = await _collectionDataService.GetAllCollectionDataAsync();
                if (collectionDatas == null) return NoContent();

                return Ok(collectionDatas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Coletas. Erro: {ex.Message}");
            }
        }

        [HttpGet("{CollectionDatasId}")]
        [Authorize(Roles = "Cliente2, Associacao, Administrador")]
        public async Task<IActionResult> Get(int collectionDatasId)
        {
            try
            {
                var collectionData = await _collectionDataService.GetCollectionDataAsyncById(collectionDatasId);
                if (collectionData == null) return NoContent();

                return Ok(collectionData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Coletas. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Cliente2, Associacao, Administrador")]
        public async Task<IActionResult> Post(CollectionDataDto model)
        {
            try
            {
                var collectionData = await _collectionDataService.AddCollectionData(model);
                if (collectionData == null) return NoContent();

                return Ok(collectionData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar Coletas. Erro: {ex.Message}");
            }
        }

        [HttpPut("{CollectionDatasId}")]
        [Authorize(Roles = "Cliente2, Associacao, Administrador")]
        public async Task<IActionResult> Put(int collectionDatasId, CollectionDataDto model)
        {
            try
            {
                var collectionData = await _collectionDataService.UpdateCollectionData(collectionDatasId, model);
                if (collectionData == null) return NoContent();

                return Ok(collectionData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar Coletas. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{CollectionDatasId}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Delete(int collectionDatasId)
        {
            try
            {
                var collectionDatas = await _collectionDataService.GetCollectionDataAsyncById(collectionDatasId);
                if (collectionDatas == null) return NoContent();

                if (await _collectionDataService.DeleteCollectionData(collectionDatasId))
                {
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um problem não específico ao tentar deletar Coleta.");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Coleta. Erro: {ex.Message}");
            }
        }
    }
}
