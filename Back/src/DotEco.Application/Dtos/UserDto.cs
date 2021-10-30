namespace DotEco.Application.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public int Type { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public string Password { get; set; }
    }
}