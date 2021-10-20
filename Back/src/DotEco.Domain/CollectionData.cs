using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DotEco.Domain
{
    public class CollectionData
    {
        [Key]
        public int Id { get; set; }
        public string Address { get; set; }
        public string CEP { get; set; }
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public List<Association> Association { get; set; }

    }
}