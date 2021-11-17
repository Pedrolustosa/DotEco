using System.Threading.Tasks;
using DotEco.Application.Dtos;
using Microsoft.AspNetCore.Identity;

namespace DotEco.Application.Contracts
{
    public interface IAccountService
    {
        Task<bool> UserExists(string username, string email);
        Task<UserUpdateDto> GetUserByUserNameAsync(string username);
        Task<SignInResult> CheckUserPasswordAsync(UserUpdateDto userUpdateDto, string password);
        Task<UserUpdateDto> CreateAccountAsync(UserDto userDto);
        Task<UserUpdateDto> UpdateAccount(UserUpdateDto userUpdateDto);
        Task<UserDto[]> GetAllUsersAsync();
    }
}