using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace DotEco.Domain.Identity
{
    public class User : IdentityUser<int>
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }
        public string CPF { get; set; }
        public TypeUser TypeUser { get; set; }
        public List<UserRole> UserRoles { get; set; }
    }

    public enum TypeUser
    {
        Client = 0,
        Company = 1,
        Association = 2,
    }
}