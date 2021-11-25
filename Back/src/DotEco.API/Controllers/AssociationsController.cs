using AutoMapper;
using DotEco.Domain;
using DotEco.Persistence;
using System.Threading.Tasks;
using DotEco.Application.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using DotEco.Persistence.Contracts;
using DotEco.Application.Contracts;
using Microsoft.AspNetCore.Hosting;
using System;
using DotEco.Persistence.Models;
using DotEco.API.Extensions;

namespace DotEco.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AssociationsController : ControllerBase
    {
        private readonly IAssociationService _associationService;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IAccountService _accountService;

        public AssociationsController(IAssociationService associationService,
                                 IWebHostEnvironment hostEnvironment,
                                 IAccountService accountService)
        {
            _hostEnvironment = hostEnvironment;
            _accountService = accountService;
            _associationService = associationService;
        }

        [HttpGet]
        [Authorize(Roles = "Cliente2, Associacao, Administrador")]
        public async Task<IActionResult> Get([FromQuery] PageParams pageParams)
        {
            try
            {
                var associations = await _associationService.GetAllAssociationAsync(pageParams);
                if (associations == null) return NoContent();

                Response.AddPagination(associations.CurrentPage, associations.PageSize, associations.TotalCount, associations.TotalPages);

                return Ok(associations);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Associações. Erro: {ex.Message}");
            }
        }

        [HttpGet("{AssociationId}")]
        [Authorize(Roles = "Cliente2, Associacao, Administrador")]
        public async Task<IActionResult> Get(int AssociationId)
        {
            try
            {
                var association = await _associationService.GetAssociationAsyncById(AssociationId);
                if (association == null) return NoContent();

                return Ok(association);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Associações. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Associacao, Administrador")]
        public async Task<IActionResult> Post(AssociationDto model)
        {
            try
            {
                var association = await _associationService.AddAssociation(model);
                if (association == null) return NoContent();

                return Ok(association);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar Associações. Erro: {ex.Message}");
            }
        }

        [HttpPut("{AssociationId}")]
        [Authorize(Roles = "Associacao, Administrador")]
        public async Task<IActionResult> Put(int AssociationId, AssociationDto model)
        {
            try
            {
                var evento = await _associationService.UpdateAssociation(AssociationId, model);
                if (evento == null) return NoContent();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar Associações. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{AssociationId}")]
        [Authorize(Roles = "Associacao, Administrador")]
        public async Task<IActionResult> Delete(int AssociationId)
        {
            try
            {
                var association = await _associationService.GetAssociationAsyncById(AssociationId);
                if (association == null) return NoContent();

                if (await _associationService.DeleteAssociation(AssociationId))
                {
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um problem não específico ao tentar deletar Associação.");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Associação: {ex.Message}");
            }
        }

    }
}
