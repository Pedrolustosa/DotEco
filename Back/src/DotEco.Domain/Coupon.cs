using DotEco.Domain.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotEco.Domain
{
    [Table("Coupon")]
    public class Coupon
    {
        [Column("CouponId")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Percent { get; set; }
        public int CompanyId { get; set; }
        public Status Status { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
    }
}

public enum Status
{
    Active = 0,
    Inactive = 1,
}