using System;
using System.Threading.Tasks;
using AutoMapper;
using DotEco.Application.Contracts;
using DotEco.Application.Dtos;
using DotEco.Domain;
using DotEco.Persistence.Contracts;

namespace DotEco.Application
{
    public class CouponsService : ICouponsService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ICouponsPersist _couponsPersist;
        private readonly IMapper _mapper;
        public CouponsService(IGeralPersist geralPersist,
                             ICouponsPersist couponsPersist,
                             IMapper mapper)
        {
            _geralPersist = geralPersist;
            _couponsPersist = couponsPersist;
            _mapper = mapper;
        }
        public async Task<CouponsDto> AddCoupons(CouponsDto model)
        {
            try
            {
                var coupons = _mapper.Map<Coupon>(model);

                _geralPersist.Add<Coupon>(coupons);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var couponsRetorno = await _couponsPersist.GetCouponsAsyncById(coupons.Id);

                    return _mapper.Map<CouponsDto>(couponsRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteCoupons(int couponsId)
        {
            try
            {
                var coupons = await _couponsPersist.GetCouponsAsyncById(couponsId);
                if (coupons == null) throw new Exception("association para delete não encontrado.");

                _geralPersist.Delete<Coupon>(coupons);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CouponsDto[]> GetAllCouponsAsync()
        {
            try
            {
                var coupons = await _couponsPersist.GetAllCouponsAsync();
                if (coupons == null) return null;

                var result = _mapper.Map<CouponsDto[]>(coupons);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CouponsDto[]> GetCouponByUserIdAsync(int userId)
        {
            try
            {
                var coupons = await _couponsPersist.GetCouponByUserIdAsync(userId);
                if (coupons == null) return null;

                var result = _mapper.Map<CouponsDto[]>(coupons);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CouponsDto[]> GetCouponByCompanyIdAsync(int companyId)
        {
            try
            {
                var coupons = await _couponsPersist.GetCouponByCompanyIdAsync(companyId);
                if (coupons == null) return null;

                var result = _mapper.Map<CouponsDto[]>(coupons);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CouponsDto> GetCouponsAsyncById(int couponsId)
        {
            try
            {
                var coupon = await _couponsPersist.GetCouponsAsyncById(couponsId);
                if (coupon == null) return null;

                var resultado = _mapper.Map<CouponsDto>(coupon);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CouponsDto> UpdateCoupons(int couponsId, CouponsDto model)
        {
            try
            {
                var coupon = await _couponsPersist.GetCouponsAsyncById(couponsId);
                if (coupon == null) return null;

                model.Id = couponsId;

                _mapper.Map(model, coupon);

                _geralPersist.Update<Coupon>(coupon);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var couponRetorno = await _couponsPersist.GetCouponsAsyncById(couponsId);

                    return _mapper.Map<CouponsDto>(couponRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}