namespace TripPlannerBackend.API.Dto
{
  public class GetLocationDto
  {
      public int Id { get; set; }
      public string City { get; set; }
      public string Address { get; set; }
      public string Country { get; set; }
  }
}
