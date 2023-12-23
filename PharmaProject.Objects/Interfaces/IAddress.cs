using PharmaProject.Objects.Models;

namespace PharmaProject.Objects.Interfaces
{
    public interface IAddress
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string StateCode { get; set; }
        public string Zip { get; set; }     

    }
}
