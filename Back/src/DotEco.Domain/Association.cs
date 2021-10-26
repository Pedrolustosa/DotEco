using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotEco.Domain
{
    [Table("Association")]
    public class Association
    {
        [Column("AssociationId")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string CEP { get; set; }
        public string CNPJ { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public List<CollectionData> CollectionDatas { get; set; }
    }
}