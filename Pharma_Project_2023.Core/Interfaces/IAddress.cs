using Pharma_Project_2023.Core.Objects;

namespace Pharma_Project_2023.Core.Interfaces
{
    public interface IAddress
    {
        public string Address { get; set; }
        public string City { get; set; }
        public char StateCode { get; set; }
        public string Zip { get; set; }
        public List<Pharma_Project_2023.Core.Objects.State> States{ get; set; }

    }
}
