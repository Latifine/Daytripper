namespace TripPlannerBackend.API.Dto
{
  public class GetTripDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public double Budget { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Logo { get; set; }
    public GetLocationDto Location { get; set; }
    public bool IsPublic { get; set; }
    public IEnumerable<GetActivityDto> Activities { get; set; }
    public IEnumerable<GetEmailDto>? EmailList { get; set; }
    public bool IsUsed { get; set; }
  }
}
