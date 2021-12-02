using System.Threading.Tasks;
using DotEco.Domain;

namespace DotEco.Persistence.Contracts
{
    public interface ICouponsPersist
    {
        //COUPONS
        Task<Coupon[]> GetAllCouponsAsync();
        Task<Coupon[]> GetCouponsUsedAsync(int userId);
        Task<Coupon[]> GetCouponByUserIdAsync(int userId);
        Task<Coupon[]> GetCouponByCompanyIdAsync(int companyId);
        Task<Coupon> GetCouponsAsyncById(int CouponsId);
    }
}