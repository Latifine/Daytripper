namespace TripPlannerBackend.API.Dto
{
  public class GetActivityDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public GetActivityTypeDto ActivityType { get; set; }
    public DateTime? Datetime { get; set; }
    public double? Price { get; set; }
    public string? Description { get; set; }
    public GetLocationDto Location { get; set; }
    public bool? IsUsed { get; set; }
  }
}
