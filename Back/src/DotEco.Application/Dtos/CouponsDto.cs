namespace DotEco.Application.Dtos
{
    public class CouponsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Percent { get; set; }
        public int CouponId { get; set; }
        public CouponsDto Coupons { get; set; }
    }
}