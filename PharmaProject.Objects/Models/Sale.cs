using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmaProject.Objects.Models
{
    public class Sale
    {
        public int SaleId { get; set; }
        public int PharmacistId { get; set; }
        public int DrugId { get; set; }
        public decimal SalePrice { get; set; }
        public bool Active { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTimeOffset? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public Pharmacy Pharmacy { get; set; }
        public Drug Drug { get; set; }
    }
}
