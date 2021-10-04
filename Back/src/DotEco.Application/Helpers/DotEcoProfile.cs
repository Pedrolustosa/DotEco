using AutoMapper;
using DotEco.Application.Dtos;
using DotEco.Domain.Identity;

namespace DotEco.Application.Helpers
{
    public class DotEcoProfile : Profile
    {
        public DotEcoProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
        }
    }
}