using System.Collections.Generic;

namespace DotEco.Application.Dtos
{
    public class AssociationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CEP { get; set; }
        public string CpfCnpj { get; set; }
        public string Telephone { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public int? UserId { get; set; }
        public UserDto User { get; set; }
        public List<CollectionDataDto> CollectionDatas { get; set; }
    }
}