using Microsoft.EntityFrameworkCore;
using Fracto.Data.Entities;

namespace Fracto.Data.Context
{
    public class FractoDbContext : DbContext
    {
        public FractoDbContext(DbContextOptions<FractoDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Specialization> Specializations { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("Fracto"); // Schemathing
        }
    }
}
