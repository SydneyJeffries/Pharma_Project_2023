using PharmaProject.Objects.Interfaces;

namespace PharmaProject.Objects.Models
{
    public class Pharmacy : IAddress
    {
        public int  PharmacyId { get; set; } 
        public string  Name { get; set; } = string.Empty;
        public int FilledPerscriptions { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public required string StateCode { get; set; }
        public string Zip { get; set; } = string.Empty;
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset? UpdatedDate { get; set;  }
        public string CreatedBy { get; set; } = string.Empty;
        public int Id { get { return PharmacyId; } }
    }
}
