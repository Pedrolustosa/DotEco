using System.Threading.Tasks;
using DotEco.Application.Dtos;
using DotEco.Persistence.Models;

namespace DotEco.Application.Contracts
{
    public interface ICouponsService
    {
        Task<CouponsDto> AddCoupons(CouponsDto model);
        Task<CouponsDto> UpdateCoupons(int couponsId, CouponsDto model);
        Task<bool> DeleteCoupons(int couponsId);
        Task<PageList<CouponsDto>> GetAllCouponsAsync(PageParams pageParams);
        Task<CouponsDto> GetCouponsAsyncById(int couponsId);
    }
}