using PharmaProject.Objects.Interfaces;

namespace PharmaProject.Objects.Models
{
    public class Pharmacy : IAddress
    {
        public int PharmacyId { get; set; } 
        public string? Name { get; set; } 
        public int FilledPerscriptions { get; set; }
        public string? Address { get; set; } 
        public string? City { get; set; } 
        public required string StateCode { get; set; }
        public string? Zip { get; set; } 
        public DateTime CreatedDate { get; }
        public  DateTime? UpdatedDate { get; set;  }
        public string CreatedBy { get;  }  
    }
}
