using Microsoft.EntityFrameworkCore;
using PharmaProject.Objects.Models;


namespace PharmaProject.Objects
{
    public class AppSettingsDbContext : DbContext
    {
        public DbSet<Pharmacy> Pharmacies { get; set; }

        public DbSet<State> States { get; set; }

        public DbSet<Delivery> Deliveries { get; set; }

        public AppSettingsDbContext() : base() { }

        public AppSettingsDbContext(DbContextOptions<AppSettingsDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Delivery>().HasKey(x => x.DeliveryId);
            modelBuilder.Entity<Pharmacy>().ToTable("Deliveries");
            modelBuilder.Entity<Pharmacy>().HasKey(x => x.PharmacyId);
            modelBuilder.Entity<Pharmacy>().ToTable("Pharmacies");
            modelBuilder.Entity<State>().HasKey(x => x.StateCode);
            modelBuilder.Entity<State>().ToTable("States");
        }

    }
}
