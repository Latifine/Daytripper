using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.DAL
{
  public class TripPlannerDbContext : DbContext
  {
    public TripPlannerDbContext()
    {

    }

    public TripPlannerDbContext(DbContextOptions<TripPlannerDbContext> options) : base(options)
    {
    }
    public DbSet<Trip> Trips => Set<Trip>();
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<Location> Locations => Set<Location>();
    public DbSet<ActivityType> ActivityTypes => Set<ActivityType>();
    public DbSet<EmailList> EmailLists => Set<EmailList>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Trip>()
            .HasOne(t => t.Location)
            .WithOne()
            .HasForeignKey<Trip>(t => t.LocationId)
            .OnDelete(DeleteBehavior.Restrict);

      modelBuilder.Entity<Activity>()
          .HasOne(a => a.Location)
          .WithOne()
          .HasForeignKey<Activity>(a => a.LocationId)
          .OnDelete(DeleteBehavior.Restrict);


      //modelBuilder.Entity<Activity>()
      //    .HasOne(a => a.ActivityType)
      //    .WithOne()
      //    .HasForeignKey<Activity>(a => a.ActivityTypeId)
      //    .OnDelete(DeleteBehavior.Restrict);
      modelBuilder.Entity<Location>()
          .HasMany(l => l.Activities)
          .WithOne(a => a.Location)
          .HasForeignKey(a => a.LocationId)
          .OnDelete(DeleteBehavior.Restrict);
      modelBuilder.Entity<Location>()
          .HasMany(l => l.Trips)
          .WithOne(t => t.Location)
          .HasForeignKey(t => t.LocationId)
          .OnDelete(DeleteBehavior.Restrict);
    }
  }
}
