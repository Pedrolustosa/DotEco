using System.Collections.Generic;

namespace DotEco.Application.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public int Type { get; set; }
        public int Points { get; set; }
        public string Email { get; set; }
        public string CpfCnpj { get; set; }
        public string Password { get; set; }
        public List<CouponsDto> Coupons { get; set; }
        public List<UserDto> Users { get; set; }
        public List<AssociationDto> Associations { get; set; }
    }
}