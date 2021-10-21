
using System.ComponentModel.DataAnnotations;

namespace DotEco.Application.Dtos
{
    public class CollectionDataPostDto
    {
        [Key]
        public int Id { get; set; }
        public string Address { get; set; }
        public string CEP { get; set; }
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public virtual int AssociationId { get; set; }
    }
}