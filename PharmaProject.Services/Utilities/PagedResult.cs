using PharmaProject.Services.Utilities.Interfaces;

namespace PharmaProject.Services.Utilities;

public class PagedResult<T> : IPagedResult<T>
{
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public IEnumerable<T> Data { get; set; }
}