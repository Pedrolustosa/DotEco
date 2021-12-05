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
        public string Description { get; set; }
        public string UserFullName { get; set; }
        public string CompanyFullName { get; set; }
        public int CompanyId { get; set; }
        public Status Status { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
    }
}

public enum Status
{
    Ativo,
    Inativo,
}