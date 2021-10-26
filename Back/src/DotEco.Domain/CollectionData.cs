using System;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotEco.Domain
{
    [Table("CollectionData")]
    public class CollectionData
    {
        [Column("CollectionDataId")]
        public int Id { get; set; }
        public string Address { get; set; }
        public string CEP { get; set; }
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public DateTime Date { get; set; }
        public int AssociationId { get; set; }
        public Association Association {get; set;}
    }
}