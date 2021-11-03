using System.Threading.Tasks;
using DotEco.Application.Dtos;

namespace DotEco.Application.Contracts
{
    public interface ITokenService
    {
        Task<string> CreateToken(UserUpdateDto userUpdateDto);
    }
}