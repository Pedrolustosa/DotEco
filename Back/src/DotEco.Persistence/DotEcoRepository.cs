using System.Linq;
using DotEco.Domain;
using System.Threading.Tasks;
using DotEco.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace DotEco.Persistence
{
    public class DotEcoRepository : IDotEcoRepository
    {
        private readonly DotEcoContext _context;
        public DotEcoRepository(DotEcoContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        //GERAIS
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        //ASSOCIATIONS
        public async Task<Association[]> GetAllAssociationAsync()
        {
            IQueryable<Association> query = _context.Associations.Include(x => x.CollectionData);

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Association> GetAssociationAsyncById(int AssociationId)
        {
            IQueryable<Association> query = _context.Associations;

            query = query
                        .AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == AssociationId);

            return await query.FirstOrDefaultAsync();
        }

        //COLLECTION DATA
        public async Task<CollectionData[]> GetAllCollectionDataAsync()
        {
            IQueryable<CollectionData> query = _context.CollectionDatas.Include(cd => cd.Association);

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<CollectionData> GetCollectionDataAsyncById(int CollectionDataId)
        {
            IQueryable<CollectionData> query = _context.CollectionDatas.Include(cd => cd.Association);

            query = query
                        .AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == CollectionDataId);

            return await query.FirstOrDefaultAsync();
        }

        //COUPONS
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