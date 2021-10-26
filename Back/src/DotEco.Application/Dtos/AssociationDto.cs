using System.Collections.Generic;

namespace DotEco.Application.Dtos
{
    public class AssociationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CEP { get; set; }
        public string CNPJ { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public List<CollectionDataDto> CollectionDatas { get; set; }
    }
}