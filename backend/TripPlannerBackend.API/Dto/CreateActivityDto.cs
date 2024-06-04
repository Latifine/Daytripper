

using System.ComponentModel.DataAnnotations;

namespace TripPlannerBackend.API.Dto
{
  public class CreateActivityDto
  {
    public string Name { get; set; }
    public int? ActivityTypeId { get; set; }
    public GetActivityTypeDto ActivityType { get; set; }
    public double? Price { get; set; }
    public string? Description { get; set; }
    public int? LocationId { get; set; }
    public CreateLocationDto Location { get; set; }
    public DateTime Datetime { get; set; }
    public bool? IsUsed { get; set; } = true;
  }
}
