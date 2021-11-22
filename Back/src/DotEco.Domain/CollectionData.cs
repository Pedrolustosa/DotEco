using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DotEco.Domain.Identity;

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
        public string TypeCollection { get; set; }
        public DateTime Date { get; set; }
        public StatusClient StatusClient { get; set; }
        public StatusAssociation StatusAssociation { get; set; }
        public int? AssociationId { get; set; }
        public Association Association { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
    }
}

public enum StatusClient
{
    [Display(Name = "Agendado")]
    Scheduled = 0,
    [Display(Name = "Confirmado")]
    Confirmed = 1,
    [Display(Name = "Recusado")]
    Refused = 2,
}

public enum StatusAssociation
{
    [Display(Name = "Agendado")]
    Scheduled = 0,
    [Display(Name = "Confirmado")]
    Confirmed = 1,
    [Display(Name = "Recusado")]
    Refused = 2,
}