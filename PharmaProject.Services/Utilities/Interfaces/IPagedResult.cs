using PharmaProject.Objects.Models;

namespace PharmaProject.Services.Utilities.Interfaces
{
    public interface IPagedResult<out T>
    {
        int CurrentPage { get; }
        int TotalPages { get; }
        int PageSize { get; }
        int TotalCount { get; }
        IEnumerable<T> Data { get; }
    }

}
