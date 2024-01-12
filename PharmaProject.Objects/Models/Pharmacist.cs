using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmaProject.Objects.Models
{
    public class Pharmacist
    {
        public int PharmacistId { get; set; }
        public int PharmacyId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int Age { get; set; }
        public DateTimeOffset DateOfHire { get; set; }
        public bool Active { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTimeOffset? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        [NotMapped]
        public string FullName { get { return FirstName + ' ' +  LastName; } }

      

    }
}
