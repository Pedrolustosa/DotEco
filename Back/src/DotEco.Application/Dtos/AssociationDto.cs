using System.Collections.Generic;
using DotEco.Domain;

namespace DotEco.Application.Dtos
{
    public class AssociationDto
    {
        public int AssociationId { get; set; }
        public string Name { get; set; }
        public string CEP { get; set; }
        public string CNPJ { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
    }
}