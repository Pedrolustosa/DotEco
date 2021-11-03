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
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task<Coupons[]> GetAllCouponsAsync()
        {
            IQueryable<Coupons> query = _context.Coupons;

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Coupons> GetCouponsAsyncById(int CouponsId)
        {
            IQueryable<Coupons> query = _context.Coupons;

            query = query
                        .AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == CouponsId);

            return await query.FirstOrDefaultAsync();
        }
    }
}