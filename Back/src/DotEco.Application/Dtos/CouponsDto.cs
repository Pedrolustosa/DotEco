namespace DotEco.Application.Dtos
{
    public class CouponsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Percent { get; set; }
        public string Status { get; set; }
        public int? UserId { get; set; }
        public UserDto Users { get; set; }
    }
}