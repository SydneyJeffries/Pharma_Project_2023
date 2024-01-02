using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PharmaProject.Objects.Models
{
    public class Delivery 
    {
        [Key]
        public int DeliveryId { get; set; }

        public int WarehouseId { get; set; }

        public int PharmacyId { get; set; }

        public int DrugId { get; set; }

        public int UnitCount { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal TotalPrice { get; set; }

        public DateTimeOffset DeliveryDate { get; set; }

        public bool Active { get; set;  }

        public int Id { get { return DeliveryId; } }

        public DateTimeOffset? UpdatedDate { get; set; }

        public DateTimeOffset CreatedDate { get; set; }

        public string CreatedBy { get; set; } = string.Empty;

        public string? UpdatedBy { get; set;  }


        //[JsonIgnore]
        public virtual Pharmacy? Pharmacy { get; set; }

        public virtual WareHouse? Warehouse { get; set; }
    }
}
