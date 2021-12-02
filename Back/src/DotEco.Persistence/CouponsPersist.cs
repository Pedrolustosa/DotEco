using System.Linq;
using System.Threading.Tasks;
using DotEco.Domain;
using DotEco.Persistence.Context;
using DotEco.Persistence.Contracts;
using Microsoft.EntityFrameworkCore;

namespace DotEco.Persistence
{
    public class CouponsPersist : ICouponsPersist
    {
        private readonly DotEcoContext _context;
        public CouponsPersist(DotEcoContext context)
        {
            _context = context;
        }
        public async Task<Coupon[]> GetAllCouponsAsync()
        {
            IQueryable<Coupon> query = _context.Coupons;

            query = query.AsNoTracking()
                        .Where(c => c.UserId == null && c.Status == Status.Active)
                        .OrderByDescending(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Coupon[]> GetCouponsUsedAsync(int userId)
        {
            IQueryable<Coupon> query = _context.Coupons;

            query = query.AsNoTracking()
                        .Where(c => c.UserId == userId && c.Status == Status.Inactive)
                        .OrderByDescending(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Coupon[]> GetCouponByUserIdAsync(int userId)
        {
            IQueryable<Coupon> query = _context.Coupons;

            query = query.AsNoTracking()
                        .Where(c => c.UserId == userId && c.Status == Status.Active)
                        .OrderByDescending(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Coupon[]> GetCouponByCompanyIdAsync(int companyId)
        {
            IQueryable<Coupon> query = _context.Coupons;

            query = query.AsNoTracking()
                        .Where(c => c.CompanyId == companyId)
                        .OrderByDescending(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Coupon> GetCouponsAsyncById(int CouponsId)
        {
            IQueryable<Coupon> query = _context.Coupons;

            query = query
                        .AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == CouponsId);

            return await query.FirstOrDefaultAsync();
        }
    }
}