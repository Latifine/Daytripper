using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlannerBackend.DAL.Entity
{
  public class Trip
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Logo { get; set; }
    public bool IsPublic { get; set; }
    public double Budget { get; set; }
    public ICollection<Activity>? Activities { get; set; } = new List<Activity>();
    public int LocationId { get; set; }
    public Location Location { get; set; }
    public ICollection<EmailList>? EmailList { get; set; } = new List<EmailList>();
    public bool IsUsed { get; set; } = true;
  }
}
