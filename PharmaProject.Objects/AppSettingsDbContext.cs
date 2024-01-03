using Microsoft.EntityFrameworkCore;
using PharmaProject.Objects.Models;


namespace PharmaProject.Objects
{
    public class AppSettingsDbContext : DbContext
    {
        public DbSet<Pharmacy> Pharmacy { get; set; }

        public DbSet<State> State { get; set; }

        public DbSet<Drug> Drug { get; set; }

        public DbSet<Delivery> Delivery { get; set; }

        public DbSet<Warehouse> Warehouse { get; set; }

        public AppSettingsDbContext() : base() { }

        public AppSettingsDbContext(DbContextOptions<AppSettingsDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Drug>().HasKey(x => x.DrugId);
            modelBuilder.Entity<Drug>().ToTable("Drug");
            modelBuilder.Entity<Delivery>().HasKey(x => x.DeliveryId);
            modelBuilder.Entity<Delivery>().ToTable("Delivery");
            modelBuilder.Entity<Warehouse>().HasKey(x => x.WarehouseId);
            modelBuilder.Entity<Warehouse>().ToTable("Warehouse");
            modelBuilder.Entity<Pharmacy>().HasKey(x => x.PharmacyId);
            modelBuilder.Entity<Pharmacy>().ToTable("Pharmacy");
            modelBuilder.Entity<State>().HasKey(x => x.StateCode);
            modelBuilder.Entity<State>().ToTable("State");
        }

    }
}
