using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PharmaProject.Objects.Models
{
    public class Drug
    {
        public int DrugId { get; set; }
        public string DrugName { get; set; } = string.Empty;
        public bool Active { get; set; }
        public string CreatedBy { get; set; } = string.Empty;

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset? UpdatedDate { get; set; }

        public string? UpdatedBy { get; set; }

    }
}
