using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlannerBackend.API.Dto;
using TripPlannerBackend.DAL;
using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TripController : ControllerBase
  {
    private readonly TripPlannerDbContext _context;
    private readonly IMapper _mapper;
    public TripController(TripPlannerDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    //Get By ID
    [HttpGet("{id}")]
    public async Task<ActionResult<GetTripDto>> GetTrip(int id)
    {
      var trip = await _context.Trips
        .Include(t => t.Activities)
          .ThenInclude(a => a.ActivityType)
        .Include(t => t.Activities)
          .ThenInclude(b => b.Location)
        .Include(t => t.Location)
        .Include(t=> t.EmailList)
        .SingleOrDefaultAsync(t => t.Id == id);

      if (trip == null)
      {
        return NotFound();
      }

      return _mapper.Map<GetTripDto>(trip);
    }

    // Get ALL
    [HttpGet]
    public async Task<ActionResult<List<GetTripDto>>> GetTrips()
    {
      var trips = await _context.Trips
        .Include(t => t.Activities)
          .ThenInclude(a => a.ActivityType)
        .Include(t => t.Activities)
          .ThenInclude(b=> b.Location)
        .Include(t => t.Location)
        .Include(t => t.EmailList)
        .ToListAsync();

      if (trips == null)
      {
        return NotFound();
      }

      return _mapper.Map<List<GetTripDto>>(trips);
    }



    //get all activitytypes
    [HttpGet("activitytypes")]
    public async Task<ActionResult<List<GetActivityTypeDto>>> GetActivityTypes()
    {
      var activityTypes = await _context.ActivityTypes.ToListAsync();

      if (activityTypes == null)
      {
        return NotFound();
      }

      return _mapper.Map<List<GetActivityTypeDto>>(activityTypes);
    }

    //get all locations
    [HttpGet("locations")]
    public async Task<ActionResult<List<GetLocationDto>>> GetLocations()
    {
      var locations = await _context.Locations.ToListAsync();

      if (locations == null)
      {
        return NotFound();
      }

      return _mapper.Map<List<GetLocationDto>>(locations);
    }

    
    //get all activities
    [HttpGet("activities")]
    public async Task<ActionResult<List<GetActivityDto>>> GetActivities()
    {
      var activities = await _context.Activities
        .Include(a => a.ActivityType)
        .Include(a => a.Location)
        .ToListAsync();

      if (activities == null)
      {
        return NotFound();
      }

      return _mapper.Map<List<GetActivityDto>>(activities);
    }

    //Insert - you have to be authenticated
    [HttpPost]
    //[Authorize]
    public async Task<ActionResult<GetTripDto>> AddTrip(CreateTripDto trip)
    {

      Trip tripToAdd = _mapper.Map<Trip>(trip);
      _context.Trips.Add(tripToAdd);
      await _context.SaveChangesAsync();
      GetTripDto tripToReturn = _mapper.Map<GetTripDto>(tripToAdd);

      return CreatedAtAction(nameof(GetTrip), new { id = tripToReturn.Id }, tripToReturn);
    }

    
    [HttpPost("activities/{id}")]
    //[Authorize]
    public async Task<ActionResult<GetTripDto>> AddActivityToTrip(int id, CreateActivityDto activity)
    {
      var trip = await _context.Trips
      .Include(t => t.Activities)
      .Include(t => t.Location)
      .SingleOrDefaultAsync(t => t.Id == id);
      if (trip == null)
      {
        return NotFound();
      }
      trip.Activities.Add(_mapper.Map<Activity>(activity));
      await _context.SaveChangesAsync();
      return _mapper.Map<GetTripDto>(trip);
    }


    [HttpPut("{id}")]
    //[Authorize]
    public async Task<ActionResult<EditTripDto>> EditTrip(int id, EditTripDto editTrip)
    {
      var trip = await _context.Trips
        .Include(t => t.Location)
        .Include(t => t.Activities)
        .SingleOrDefaultAsync(t => t.Id == id);

      if (trip == null)
      {
        return NotFound();
      }

      _context.Entry(trip).State = EntityState.Detached;


      _mapper.Map(editTrip, trip);


      foreach (var mail in editTrip.EmailList)
      {
        Console.WriteLine(mail.Email);

        if (!_context.EmailLists.Any(e => e.Email == mail.Email))
        {
          var newEmail = new EmailList { Email = mail.Email, TripId=id };
          _context.EmailLists.Add(newEmail);

          trip.EmailList.Add(newEmail); 
        }
      }

      await _context.SaveChangesAsync();
      return Ok(_mapper.Map<GetTripDto>(trip));
    }

    //edit acitivity by activity id

    [HttpPut("activities/{activityId}")]
    //[Authorize]
    public async Task<ActionResult<GetActivityDto>> EditActivity(int activityId, EditActivityDto editActivity)
    {
      var activity = await _context.Activities.FindAsync(activityId);

      if (activity == null)
      {
        return NotFound();
      }

      _mapper.Map(editActivity, activity);


      await _context.SaveChangesAsync();
      return NoContent();
    }

    //get activity by activity id
    [HttpGet("activities/{activityId}")]
    //[Authorize]
    public async Task<ActionResult<GetActivityDto>> GetActivity(int activityId)
    {
      var activity = await _context.Activities
        .Include(a => a.ActivityType)
        .Include(a => a.Location)
        .SingleOrDefaultAsync(a => a.Id == activityId);

      if (activity == null)
      {
        return NotFound();
      }

      return _mapper.Map<GetActivityDto>(activity);
    }


    //deactivate a trip by trip id
    [HttpDelete("{id}")]
    //[Authorize]
    public async Task<ActionResult> DeleteTrip(int id)
    {
      //set trip to inactive
      var trip = await _context.Trips.FindAsync(id);
      if (trip == null)
      {
        return NotFound();
      }
      trip.IsUsed = false;
      await _context.SaveChangesAsync();
      return NoContent();
    }


    //deactivate an activity from a trip by activity id
    [HttpDelete("{id}/activities/{activityId}")]
    //[Authorize]
    public async Task<ActionResult> DeleteActivitiesFromTrip(int id, int activityId)
    {
      //set activity to inactive
      var activity = await _context.Activities.FindAsync(activityId);
      if (activity == null)
      {
        return NotFound();
      }
      activity.IsUsed = false;
      await _context.SaveChangesAsync();
      return NoContent();
    }
  }
}
