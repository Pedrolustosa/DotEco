using System.Linq;
using System.Threading.Tasks;
using DotEco.Domain;
using DotEco.Persistence.Context;
using DotEco.Persistence.Contracts;
using DotEco.Persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace DotEco.Persistence
{
    public class CollectionDataPersist : ICollectionDataPersist
    {
        private readonly DotEcoContext _context;
        public CollectionDataPersist(DotEcoContext context)
        {
            _context = context;
        }
        public async Task<CollectionData[]> GetAllCollectionDataAsync()
        {
            IQueryable<CollectionData> query = _context.CollectionDatas;

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<CollectionData> GetCollectionDataAsyncById(int CollectionDataId)
        {
            IQueryable<CollectionData> query = _context.CollectionDatas;

            query = query
                        .AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == CollectionDataId);

            return await query.FirstOrDefaultAsync();
        }
    }
}