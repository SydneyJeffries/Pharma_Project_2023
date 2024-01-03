
namespace PharmaProject.Objects.Models
{
    public class State
    {
        public string StateCode { get; set; } = string.Empty;
        public string StateName { get; set; } = string.Empty;
        public bool Active { get; set; }
        public string CreatedBy { get; set; } = string.Empty;

        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset? UpdatedDate { get; set; }

        public string? UpdatedBy { get; set; } = string.Empty;
    }
}
