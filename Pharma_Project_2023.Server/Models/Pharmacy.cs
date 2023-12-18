namespace Pharma_Project_2023.Server.Models
{
    public class Pharmacy : IAddress
    {
        public int PharmacyId { get; set; } 
        public string Name { get; set; }
        public int FilledPerscriptions { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public char StateCode { get; set; }
        public string Zip { get; set; }
        public List<State> States { get; set; }
        public DateTimeOffset CreatedDate {get; set; }
        public DateTimeOffset UpdatedDate { get; set;  }
    }
}
