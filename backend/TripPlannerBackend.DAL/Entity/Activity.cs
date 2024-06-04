namespace TripPlannerBackend.DAL.Entity
{
  
  public class Activity
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public int? ActivityTypeId{ get; set; }
    public ActivityType ActivityType { get; set; }
    public double? Price { get; set; }
    public string? Description { get; set; }
    public int? LocationId { get; set; }
    public Location? Location { get; set; }
    public DateTime Datetime { get; set; }
    public bool? IsUsed { get; set; } = true;
  }
}
