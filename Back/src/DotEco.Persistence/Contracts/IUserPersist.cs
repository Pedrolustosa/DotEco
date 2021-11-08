using System.Collections.Generic;
using System.Threading.Tasks;
using DotEco.Domain.Identity;

namespace DotEco.Persistence.Contracts
{
    public interface IUserPersist : IGeralPersist
    {
        //USERS
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUserNameAsync(string username);
        Task<User[]> GetAllUsersAsync();
    }
}