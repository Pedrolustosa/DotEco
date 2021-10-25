using System;

namespace DotEco.Domain
{
    public class CollectionData
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string CEP { get; set; }
        public string Reference { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public DateTime? Date { get; set; }
    }
}