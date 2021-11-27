using System;
using DotEco.Domain.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotEco.Domain
{
    [Table("CollectionData")]
    public class CollectionData
    {
        [Column("CollectionDataId")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string CEP { get; set; }
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string TypeCollection { get; set; }
        public DateTime Date { get; set; }
        public int AssociationId { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public StatusClient StatusClient { get; set; }
        public StatusAssociation StatusAssociation { get; set; }
    }
}

public enum StatusClient
{
    Waiting = 0,
    Scheduled = 1,
    Confirmed = 2,
    Refused = 3,
}

public enum StatusAssociation
{
    Waiting = 0,
    Scheduled = 1,
    Confirmed = 2,
    Refused = 3,
}