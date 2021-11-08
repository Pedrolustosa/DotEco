using DotEco.Domain.Identity;

namespace DotEco.Domain
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Percent { get; set; }
        public Status Status { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}

public enum Status
{
    Active = 1,
    Inactive = 1,
}