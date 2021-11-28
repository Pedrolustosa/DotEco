namespace DotEco.Application.Dtos
{
    public class CollectionDataDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string CEP { get; set; }
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string TypeCollection { get; set; }
        public string Date { get; set; }
        public string StatusPoint { get; set; }
        public string StatusClient { get; set; }
        public string StatusAssociation { get; set; }
        public int AssociationId { get; set; }
        public AssociationDto Association { get; set; }
        public int? UserId { get; set; }
        public UserDto User { get; set; }
    }
}