using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlannerBackend.DAL.Entity
{
  public class Location
  {
    public int Id { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string Address { get; set; }
    public ICollection<Trip> Trips { get; set; }
    public ICollection<Activity> Activities { get; set; }
  }
}
