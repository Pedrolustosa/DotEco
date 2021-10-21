using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace DotEco.Application.Dtos
{
    public class AssociationDto
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string CEP { get; set; }
        public string CNPJ { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public virtual CollectionDataDto CollectionData { get; set; }
    }
}