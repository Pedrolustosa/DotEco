using System;
using System.Threading.Tasks;
using AutoMapper;
using DotEco.API.Extensions;
using DotEco.Application.Contracts;
using DotEco.Application.Dtos;
using DotEco.Domain;
using DotEco.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotEco.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CouponsController : ControllerBase
    {
        private readonly ICouponsService _couponsService;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IAccountService _accountService;

        public CouponsController(ICouponsService couponsService,
                                 IWebHostEnvironment hostEnvironment,
                                 IAccountService accountService)
        {
            _hostEnvironment = hostEnvironment;
            _accountService = accountService;
            _couponsService = couponsService;
        }

        [HttpGet]
        [Authorize(Roles = "Cliente2, Empresa, Administrador")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var coupons = await _couponsService.GetAllCouponsAsync();
                if (coupons == null) return NoContent();

                return Ok(coupons);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Cupons. Erro: {ex.Message}");
            }
        }

        [HttpGet("{CouponsId}")]
        [Authorize(Roles = "Cliente2, Empresa, Administrador")]
        public async Task<IActionResult> Get(int couponsId)
        {
            try
            {
                var coupon = await _couponsService.GetCouponsAsyncById(couponsId);
                if (coupon == null) return NoContent();

                return Ok(coupon);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Cupons. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Empresa, Administrador")]
        public async Task<IActionResult> Post(CouponsDto model)
        {
            try
            {
                var collectionData = await _couponsService.AddCoupons(model);
                if (collectionData == null) return NoContent();

                return Ok(collectionData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar Cupons. Erro: {ex.Message}");
            }
        }

        [HttpPut("{CouponsId}")]
        [Authorize(Roles = "Cliente2, Empresa, Administrador")]
        public async Task<IActionResult> Put(int couponsId, CouponsDto model)
        {
            try
            {
                var userName = User.GetUserName();
                var user = await _accountService.GetUserByUserNameAsync(userName);
                if (user.Type == 3)
                {
                    var coupon = await _couponsService.UpdateCoupons(couponsId, model);
                    if (coupon == null) return NoContent();

                    return Ok(coupon);
                }
                else
                {
                    if (user.Points > 0)
                    {
                        int test = 1;
                        user.Points = user.Points - test;
                        await _accountService.UpdateAccount(user);

                        var coupon = await _couponsService.UpdateCoupons(couponsId, model);
                        if (coupon == null) return NoContent();

                        return Ok(coupon);
                    }
                    else if (user.Points == 0)
                    {
                        return BadRequest("Sem pontos!");
                    }
                }

                return Ok("Parabéns Pelo Cupom!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar Cupons. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{CouponsId}")]
        [Authorize(Roles = "Empresa, Administrador")]
        public async Task<IActionResult> Delete(int couponsId)
        {
            try
            {
                var coupons = await _couponsService.GetCouponsAsyncById(couponsId);
                if (coupons == null) return NoContent();

                if (await _couponsService.DeleteCoupons(couponsId))
                {
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    throw new Exception("Ocorreu um problem não específico ao tentar deletar Cupom.");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Cupom. Erro: {ex.Message}");
            }
        }
    }
}