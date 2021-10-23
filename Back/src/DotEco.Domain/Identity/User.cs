using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DotEco.Domain.Identity
{
    public class User : IdentityUser<int>
    {
        public string FullName { get; set; }
        public string CPF { get; set; }
        public int Type { get; set; }
        public List<UserRole> UserRoles { get; set; }
    }
}