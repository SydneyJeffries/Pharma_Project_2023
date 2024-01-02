using PharmaProject.Objects.Models;
using System.Net;

namespace PharmaProject.Services.Utilities.Interfaces
{
    public interface IServiceResult<T>
    {
        T? Result { get; set; }
        bool IsSuccess { get; set; }
        string? ErrorMessage { get; set; }
        HttpStatusCode StatusCode { get; set; }
    }

}
