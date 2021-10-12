using System.Collections.Generic;

namespace DotEco.Application.Dtos
{
    public class CollectionDataDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public UserDto Users { get; set; }
        public List<AssociationDto> Associations { get; set; }
        public Status Status { get; set; }
    }

    public enum Status
    {
        Confirmed = 0,
        Rescheduled = 1,
        Refused = 2
    }
}