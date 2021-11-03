using AutoMapper;
using DotEco.Application.Dtos;
using DotEco.Domain;
using DotEco.Domain.Identity;

namespace DotEco.Application.Helpers
{
    public class DotEcoProfile : Profile
    {
        public DotEcoProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UserUpdateDto>().ReverseMap();
            CreateMap<Coupons, CouponsDto>().ReverseMap();
            CreateMap<Association, AssociationDto>().ReverseMap();
            CreateMap<CollectionData, CollectionDataDto>().ReverseMap();
        }
    }
}