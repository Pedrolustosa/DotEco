using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DotEco.Domain.Identity
{
    public class User : IdentityUser<int>
    {
        public string FullName { get; set; }
        public string CpfCnpj { get; set; }
        public int Type { get; set; }
        public int Points { get; set; }
        public List<UserRole> UserRoles { get; set; }
        public List<Coupon> Coupons { get; set; }
        public List<CollectionData> CollectionDatas { get; set; }
        public List<Association> Associations { get; set; }
    }
}