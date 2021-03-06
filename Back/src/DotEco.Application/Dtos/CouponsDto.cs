namespace DotEco.Application.Dtos
{
    public class CouponsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Percent { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string UserFullName { get; set; }
        public string CompanyFullName { get; set; }
        public int CompanyId { get; set; }
        public int? UserId { get; set; }
        public UserDto Users { get; set; }
    }
}