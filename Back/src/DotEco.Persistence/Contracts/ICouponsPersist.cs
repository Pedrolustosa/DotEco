using System.Threading.Tasks;
using DotEco.Domain;
using DotEco.Persistence.Models;

namespace DotEco.Persistence.Contracts
{
    public interface ICouponsPersist
    {
        //COUPONS
        Task<Coupon[]> GetAllCouponsAsync();
        Task<Coupon> GetCouponsAsyncById(int CouponsId);
    }
}