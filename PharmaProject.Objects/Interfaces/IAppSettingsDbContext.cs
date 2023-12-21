using Microsoft.EntityFrameworkCore;
using PharmaProject.Objects.Models;

namespace PharmaProject.Objects.Interfaces
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
