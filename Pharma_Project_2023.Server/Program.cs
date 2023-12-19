using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Pharma_Project_2023.Core.Interfaces;
using Pharma_Project_2023.Server;
using Pharma_Project_2023.Services;
using Pharma_Project_2023.Core;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
string connectionString = builder.Configuration.GetConnectionString("AppSettingsDbContext");

builder.Services.AddDbContext<AppSettingsDbContext>(options =>
            options.UseSqlServer(connectionString, b => b.MigrationsAssembly("Pharma_Project_2023.Server"))
       );

builder.Services.AddScoped<IPharmacyService, PharmacyService>();

builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    options.DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("en-US");
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    //app.UseSwaggerUI();
}



app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
