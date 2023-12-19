using Microsoft.EntityFrameworkCore;
using Pharma_Project_2023.Core.Objects;

namespace Pharma_Project_2023.Core
{
    public class AppSettingsDbContext : DbContext
    {
        public DbSet<Pharmacy> Pharmacy { get; set; }

        public DbSet<State> State { get; set; }

        public AppSettingsDbContext() : base() { }

        public AppSettingsDbContext(DbContextOptions<AppSettingsDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pharmacy>().HasKey(x => x.PharmacyId);
            modelBuilder.Entity<Pharmacy>().ToTable("Pharmacies");
            modelBuilder.Entity<State>().HasKey(x => x.StateCode);
            modelBuilder.Entity<State>().ToTable("States");
        }

    }
}
