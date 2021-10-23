using System.Collections.Generic;

namespace DotEco.Domain
{
    public class Association
    {
        public int AssociationId { get; set; }
        public string Name { get; set; }
        public string CEP { get; set; }
        public string CNPJ { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public virtual CollectionData CollectionData { get; set; }

    }
}