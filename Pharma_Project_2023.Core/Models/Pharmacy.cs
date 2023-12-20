using Pharma_Project_2023.Objects.Interfaces;

namespace Pharma_Project_2023.Objects.Models
{
    public class Pharmacy : IAddress
    {
        public int PharmacyId { get; set; } 
        public string Name { get; set; } = string.Empty;
        public int FilledPerscriptions { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public char StateCode { get; set; }
        public string Zip { get; set; } = string.Empty;
        public List<State> States { get; set; } = new List<State>();
        public DateTimeOffset  CreatedDate { get; }
        public  DateTimeOffset? UpdatedDate { get; set;  }
    }
}
