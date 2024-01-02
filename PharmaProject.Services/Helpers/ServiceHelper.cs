//using System.Net;
//using System.Net.Http.Headers;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Logging;

//using Newtonsoft.Json;
//using PharmaProject.Services.Utilities.Interfaces;
//using PharmaProject.Services.Utilities;

//namespace PharmaProject.Services.Helpers;

//public static class ServiceHelper
//{
//    /// <summary>
//    /// Builds a service result with no content.
//    /// </summary>
//    /// <typeparam name="T">The type of the result.</typeparam>
//    /// <param name="message">The error message.</param>
//    /// <returns>The service result with no content.</returns>
//    public static IServiceResult<T> BuildNoContentResult<T>(string message)
//    {
//        return new ServiceResult<T>
//        {
//            IsSuccess = false,
//            ErrorMessage = message,
//            StatusCode = HttpStatusCode.OK
//        };
//    }

//    /// <summary>
//    /// Builds an error service result.
//    /// </summary>
//    /// <typeparam name="T">The type of the result.</typeparam>
//    /// <param name="ex">The exception that occurred.</param>
//    /// <param name="operation">The operation being performed.</param>
//    /// <returns>The error service result.</returns>
//    public static IServiceResult<T> BuildErrorServiceResult<T>(Exception ex, string operation)
//    {
//        return new ServiceResult<T>
//        {
//            IsSuccess = false,
//            ErrorMessage = $"An error occurred while {operation}, ex: {ex}",
//            StatusCode = HttpStatusCode.InternalServerError
//        };
//    }

//    /// <summary>
//    /// Builds a success service result.
//    /// </summary>
//    /// <typeparam name="T">The type of the result.</typeparam>
//    /// <param name="result">The result.</param>
//    /// <returns>The success service result.</returns>
//    public static IServiceResult<T> BuildSuccessServiceResult<T>(T result)
//    {
//        return new ServiceResult<T>
//        {
//            IsSuccess = true,
//            Result = result,
//            StatusCode = HttpStatusCode.OK
//        };
//    }

//    public static IActionResult HandleStreamingResponse<T>(this IServiceResult<IAsyncEnumerable<T>> serviceResponse)
//    {
//        if (!serviceResponse.IsSuccess)
//        {
//            return new ContentResult
//            {
//                Content = serviceResponse.ErrorMessage,
//                StatusCode = (int)serviceResponse.StatusCode
//            };
//        }

//        var streamData = serviceResponse.Result;

//        return new FileCallbackResult(
//            new MediaTypeHeaderValue("application/json"),
//            async (outputStream, context) =>
//            {
//                await using var writer = new StreamWriter(outputStream);
//                await foreach (var item in streamData)
//                {
//                    await writer.WriteAsync(JsonConvert.SerializeObject(item));
//                    await writer.FlushAsync();
//                }
//            });
//    }


//    public static IActionResult HandlePagedStreamingResponse<T>(
//        this IServiceResult<IPagedResult<T>> serviceResult,
//        MediaTypeHeaderValue? contentType = null)
//    {
//        if (!serviceResult.IsSuccess)
//        {
//            return new ContentResult
//            {
//                Content = serviceResult.ErrorMessage,
//                StatusCode = (int)serviceResult.StatusCode
//            };
//        }

//        contentType ??= new MediaTypeHeaderValue("application/json");

//        return new StreamingWithHeadersResult<T>(serviceResult.Result, contentType);
//    }

//    /// <summary>
//    /// Handles the service response and returns an appropriate action result.
//    /// </summary>
//    /// <typeparam name="T">The type of the result.</typeparam>
//    /// <param name="serviceResponse">The service response.</param>
//    /// <returns>The action result.</returns>
//    public static IActionResult HandleResponse<T>(this IServiceResult<T> serviceResponse)
//    {
//        return serviceResponse.IsSuccess
//            ? new ObjectResult(serviceResponse.Result)
//            {
//                StatusCode = (int)serviceResponse.StatusCode
//            }
//            : new ContentResult
//            {
//                Content = serviceResponse.ErrorMessage,
//                StatusCode = (int)serviceResponse.StatusCode
//            };
//    }

//    /// <summary>
//    /// Retrieves a paged result asynchronously.
//    /// </summary>
//    /// <typeparam name="T">The type of the result.</typeparam>
//    /// <param name="logger">The logger.</param>
//    /// <param name="query">The queryable data.</param>
//    /// <param name="pageNumber">The page number.</param>
//    /// <param name="pageSize">The page size.</param>
//    /// <returns>The paged result.</returns>
//    public static async Task<IServiceResult<IPagedResult<T>>> GetPagedResultAsync<T>(
//        ILogger logger,
//        IQueryable<T> query,
//        int pageNumber,
//        int pageSize) where T : class
//    {
//        var startRow = pageNumber * pageSize;

//        var entities = query
//            .AsQueryable()
//            .AsNoTracking()
//            .Skip(startRow)
//            .Take(pageSize)
//            .AsAsyncEnumerable();


//        return await BuildPagedServiceResultAsync<T>(
//            entities,
//            pageNumber,
//            pageSize,
//            await query.CountAsync());
//    }



//    /// <summary>
//    /// Builds a paged service result asynchronously.
//    /// </summary>
//    /// <typeparam name="T">The type of the result.</typeparam>
//    /// <param name="data">The paged data.</param>
//    /// <param name="currentPage">The current page number.</param>
//    /// <param name="pageSize">The page size.</param>
//    /// <param name="totalCount">The total count of items.</param>
//    /// <returns>The paged service result.</returns>
//    private static Task<IServiceResult<IPagedResult<T>>> BuildPagedServiceResultAsync<T>(
//        IAsyncEnumerable<T> data,
//        int currentPage,
//        int pageSize,
//        int totalCount) where T : class
//    {
//        var pagedResult = new PagedResult<T>
//        {
//            CurrentPage = currentPage,
//            PageSize = pageSize,
//            TotalCount = totalCount,
//            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
//            Data = data
//        };

//        return Task.FromResult(BuildSuccessServiceResult<IPagedResult<T>>(pagedResult));
//    }
//}