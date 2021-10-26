using System.Collections.Generic;

namespace DotEco.Application.Dtos
{
    public class CollectionDataDto
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string CEP { get; set; }
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Date { get; set; }
        public int AssociationId { get; set; }
    }
}