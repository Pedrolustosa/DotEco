using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using DotEco.Domain.Identity;

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
        public int? UserId { get; set; }
        public User User { get; set; }
        public List<CollectionData> CollectionDatas { get; set; }
    }
}