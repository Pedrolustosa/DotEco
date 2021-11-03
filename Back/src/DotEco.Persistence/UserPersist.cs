using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotEco.Domain.Identity;
using DotEco.Persistence.Context;
using DotEco.Persistence.Contracts;
using Microsoft.EntityFrameworkCore;

namespace DotEco.Persistence
{
    public class UserPersist : GeralPersist, IUserPersist
    {
        private readonly DotEcoContext _context;

        public UserPersist(DotEcoContext context) : base(context)
        {
            _context = context;
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUserNameAsync(string email)
        {
            return await _context.Users
                                 .SingleOrDefaultAsync(user => user.Email == email.ToLower());
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }
    }
}