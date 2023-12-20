using Pharma_Project_2023.Objects.Models;

namespace Pharma_Project_2023.Objects.Interfaces
{
    public interface IAddress
    {
        public string Address { get; set; }
        public string City { get; set; }
        public char StateCode { get; set; }
        public string Zip { get; set; }
        public List<State> States{ get; set; }

    }
}
