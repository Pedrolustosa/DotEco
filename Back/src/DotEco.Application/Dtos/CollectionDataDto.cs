using System.Collections.Generic;
using DotEco.Domain;

namespace DotEco.Application.Dtos
{
    public class CollectionDataDto
    {
        public int CollectionDataId { get; set; }
        public string Address { get; set; }
        public string CEP { get; set; }
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public virtual List<AssociationDto> Association { get; set; }
        public virtual int AssociationId { get; set; }

    }
}