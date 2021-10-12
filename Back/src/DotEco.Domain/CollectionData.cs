using DotEco.Domain.Identity;
using System.Collections.Generic;

namespace DotEco.Domain
{
    public class CollectionData
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public List<User> Users { get; set; }
        public List<Association> Associations { get; set; }
    }
}