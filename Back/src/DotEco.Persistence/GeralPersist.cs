using System.Threading.Tasks;
using DotEco.Persistence.Context;
using DotEco.Persistence.Contracts;
using Microsoft.EntityFrameworkCore;

namespace DotEco.Persistence
{
    public class GeralPersist : IGeralPersist
    {
        private readonly DotEcoContext _context;
        public GeralPersist(DotEcoContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.AddAsync(entity);
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
    }
}