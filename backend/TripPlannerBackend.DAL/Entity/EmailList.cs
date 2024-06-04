using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlannerBackend.DAL.Entity
{
  public class EmailList
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public int TripId { get; set; }
  }
}
