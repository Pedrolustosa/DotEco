namespace DotEco.Application.Dtos
{
    public class UserUpdateDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public int Type { get; set; }
        public int Points { get; set; }
        public string Email { get; set; }
        public string CpfCnpj { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}