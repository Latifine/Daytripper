namespace TripPlannerBackend.API.Dto
{
  public class CreateTripDto
  {
    public string Name { get; set; }
    public string? Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Logo { get; set; }
    public bool IsPublic { get; set; }
    public double Budget { get; set; }
    public IEnumerable<GetActivityDto>? Activities { get; set; }
    public CreateLocationDto Location { get; set; }
    public IEnumerable<CreateEmailDto>? EmailList { get; set; }
    public bool IsUsed { get; set; } = true;
  }
}
