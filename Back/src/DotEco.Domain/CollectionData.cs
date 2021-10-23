using System.Collections.Generic;

namespace DotEco.Domain
{
    public class CollectionData
    {
        public int CollectionDataId { get; set; }
        public string Address { get; set; }
        public string CEP { get; set; }
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public virtual List<Association> Association { get; set; }
        public virtual int AssociationId { get; set; }
    }
}