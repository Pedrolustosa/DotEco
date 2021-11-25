using System.Linq;
using System.Threading.Tasks;
using DotEco.Domain;
using DotEco.Persistence.Context;
using DotEco.Persistence.Contracts;
using DotEco.Persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace DotEco.Persistence
{
    public class AssociationPersist : IAssociationPersist
    {
        private readonly DotEcoContext _context;
        public AssociationPersist(DotEcoContext context)
        {
            _context = context;
        }
        public async Task<PageList<Association>> GetAllAssociationAsync(PageParams pageParams)
        {
            IQueryable<Association> query = _context.Associations;

            query = query.AsNoTracking()
                        .Where(e => (e.Name.ToLower().Contains(pageParams.Term.ToLower()) ||
                               e.State.ToLower().Contains(pageParams.Term.ToLower())))
                        .OrderBy(c => c.Id);

            return await PageList<Association>.CreateAsync(query, pageParams.PageNumber, pageParams.pageSize);
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
    }
}