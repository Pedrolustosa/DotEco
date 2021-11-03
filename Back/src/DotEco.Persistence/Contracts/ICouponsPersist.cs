using System.Threading.Tasks;
using DotEco.Domain;

namespace DotEco.Persistence.Contracts
{
    public interface ICouponsPersist
    {
        //COUPONS
        Task<Coupons[]> GetAllCouponsAsync();
        Task<Coupons> GetCouponsAsyncById(int CouponsId);
    }
}