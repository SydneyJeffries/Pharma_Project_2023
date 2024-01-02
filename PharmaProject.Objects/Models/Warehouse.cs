using System.Text.Json.Serialization;

namespace PharmaProject.Objects.Models
{
    public class Warehouse
    {
        public int WarehouseId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string StateCode { get; set; } = string.Empty;
        public string Zip { get; set; } = string.Empty;
        public bool Active { get; set; }
        public string CreatedBy { get; set; } = string.Empty;

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset? UpdatedDate { get; set; }

        public string? UpdatedBy {get; set; }
    }
}
