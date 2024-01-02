using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PharmaProject.Objects.Models
{
    public class Drug
    {
        public int DrugId { get; set; }
        public string DrugName { get; set; } = string.Empty;
        
    }
}
