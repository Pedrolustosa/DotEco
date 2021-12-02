using System.Threading.Tasks;
using DotEco.Application.Dtos;

namespace DotEco.Application.Contracts
{
    public interface ICouponsService
    {
        Task<CouponsDto> AddCoupons(CouponsDto model);
        Task<CouponsDto> UpdateCoupons(int couponsId, CouponsDto model);
        Task<bool> DeleteCoupons(int couponsId);
        Task<CouponsDto[]> GetAllCouponsAsync();
        Task<CouponsDto[]> GetCouponByUserIdAsync(int userId);
        Task<CouponsDto[]> GetCouponByCompanyIdAsync(int companyId);
        Task<CouponsDto> GetCouponsAsyncById(int couponsId);
    }
}