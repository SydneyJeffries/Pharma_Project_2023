using Microsoft.EntityFrameworkCore;
using Pharma_Project_2023.Objects.Models;

namespace Pharma_Project_2023.Objects.Interfaces
{
    public interface IAppSettingsDbContext 
    {
        public DbSet<Pharmacy> Pharmacy { get; set; }

        public DbSet<State> State { get; set; }

        protected  void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

    }
}
