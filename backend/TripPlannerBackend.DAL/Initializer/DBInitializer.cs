using System.Globalization;
using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.DAL.Initializer
{
  public class DBInitializer
  {
    public static void Initialize(TripPlannerDbContext context)
    {
      //ensure the database is deleted and disconnected before making a new one
      context.Database.EnsureDeleted();

      //create new database
      context.Database.EnsureCreated();

      
      // objects
      
      ActivityType type = new ActivityType {
        Name = "Monument visit"
      };
      ActivityType type2 = new ActivityType
      {
        Name = "Museum"
      };
      ActivityType type3 = new ActivityType
      {
        Name = "Park"
      };
      ActivityType type4 = new ActivityType
      {
        Name = "Bike ride"
      };
      ActivityType type5 = new ActivityType
      {
        Name = "Other"
      };
      Location loc1 = new Location
      {
        Address = "Kleinhoefstraat 4",
        City = "Geel",
        Country = "Belgium",
      };
      Location loc2 = new Location
      {
        Address = "Straat 20",
        City = "Antwerpen",
        Country = "France"
      };
      

      // Additional ActivityTypes
      ActivityType type6 = new ActivityType
      {
        Name = "Beach Day"
      };
      ActivityType type7 = new ActivityType
      {
        Name = "Food Tasting"
      };
      ActivityType type8 = new ActivityType
      {
        Name = "Shopping"
      };
      ActivityType type9 = new ActivityType
      {
        Name = "Concert"
      };
      ActivityType type10 = new ActivityType
      {
        Name = "Adventure"
      };
      ActivityType type11 = new ActivityType
      {
        Name = "Exploration"
      };
      ActivityType type12 = new ActivityType
      {
        Name = "Marathon"
      };
      ActivityType type14 = new ActivityType
      {
        Name = "Expedition"
      };
      ActivityType type15 = new ActivityType
      {
        Name = "Skydiving"
      };
      ActivityType type16 = new ActivityType
      {
        Name = "Safari"
      };
      ActivityType type18 = new ActivityType
      {
        Name = "Cruise"
      };


      // Additional Locations
      Location loc3 = new Location
      {
        Address = "Ocean Drive 123",
        City = "Miami",
        Country = "USA"
      };
      Location loc4 = new Location
      {
        Address = "Champs-Élysées 45",
        City = "Paris",
        Country = "France"
      };
      Location loc5 = new Location
      {
        Address = "Broadway 1",
        City = "New York",
        Country = "USA"
      };
      Location loc6 = new Location
      {
        Address = "Santorini, Greece",
        City = "Thira",
        Country = "Greece"
      };
      Location loc7 = new Location
      {
        Address = "Tokyo Tower",
        City = "Tokyo",
        Country = "Japan"
      };
      Location loc8 = new Location
      {
        Address = "Great Barrier Reef",
        City = "Queensland",
        Country = "Australia"
      };
      Location loc9 = new Location
      {
        Address = "Machu Picchu",
        City = "Aguas Calientes",
        Country = "Peru"
      };
      Location loc10 = new Location
      {
        Address = "Dubai Marina",
        City = "Dubai",
        Country = "United Arab Emirates"
      };
      Location loc11 = new Location
      {
        Address = "Iguazu Falls",
        City = "Puerto Iguazu",
        Country = "Argentina"
      };
      Location loc12 = new Location
      {
        Address = "Victoria Falls",
        City = "Livingstone",
        Country = "Zambia"
      };
      Location loc13 = new Location
      {
        Address = "Banff National Park",
        City = "Banff",
        Country = "Canada"
      };
      Location loc14 = new Location
      {
        Address = "Serengeti National Park",
        City = "Serengeti",
        Country = "Tanzania"
      };
      Location loc15 = new Location
      {
        Address = "Galápagos Islands",
        City = "Puerto Ayora",
        Country = "Ecuador"
      };
      Location loc16 = new Location
      {
        Address = "Grand Canyon",
        City = "Arizona",
        Country = "USA"
      };
      Location loc17 = new Location
      {
        Address = "Ban Gioc Waterfall",
        City = "Cao Bang",
        Country = "Vietnam"
      };
      Location loc18 = new Location
      {
        Address = "Norwegian Fjords",
        City = "Bergen",
        Country = "Norway"
      };
      Location loc19 = new Location
      {
        Address = "Sossusvlei",
        City = "Namib-Naukluft National Park",
        Country = "Namibia"
      };
      Location loc20 = new Location
      {
        Address = "Yellowstone National Park",
        City = "Wyoming",
        Country = "USA"
      };

      // Additional Activities
      Activity act2 = new Activity
      {
        Name = "Sunset Beach Party",
        Description = "Enjoy a beach party with a stunning sunset view",
        Location = loc3,
        LocationId = 3,
        ActivityType = type6,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price = 25
      };
      Activity act3 = new Activity
      {
        Name = "Gourmet Tour",
        Description = "Explore the city's best culinary delights",
        Location = loc4,
        LocationId = 4,
        ActivityType = type7,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price = 20
      };
      Activity act4 = new Activity
      {
        Name = "Shopping Spree",
        Description = "Shop till you drop at the famous shopping district",
        Location = loc4,
        LocationId = 4,
        ActivityType = type8,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price = 150
      };
      Activity act5 = new Activity
      {
        Name = "Live Music Concert",
        Description = "Experience the energy of a live music performance",
        Location = loc2,
        LocationId = 2,
        ActivityType = type9,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price =80
      };
      Activity act6 = new Activity
      {
        Name = "Mountain Hiking",
        Description = "Embark on an exciting mountain hiking adventure",
        Location = loc1,
        LocationId = 1,
        ActivityType = type10,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price =40
      };
      Activity act7 = new Activity
      {
        Name = "Historical Tour",
        Description = "Explore the rich history of the ancient city",
        Location = loc6,
        LocationId = 6,
        ActivityType = type11,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price = 35
      };
      Activity act8 = new Activity
      {
        Name = "Anime Convention",
        Description = "Immerse yourself in the world of Japanese anime",
        Location = loc7,
        LocationId = 7,
        ActivityType = type12,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price =5
      };
      Activity act9 = new Activity
      {
        Name = "Snorkeling Adventure",
        Description = "Discover the vibrant underwater world of the reef",
        Location = loc8,
        LocationId = 8,
        ActivityType = type10,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price = 65
      };
      Activity act10 = new Activity
      {
        Name = "Inca Trail Hike",
        Description = "Embark on a challenging hike to the ancient Incan ruins",
        Location = loc9,
        LocationId = 9,
        ActivityType = type14,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price = 15
      };
      Activity act11 = new Activity
      {
        Name = "Skydiving in the Desert",
        Description = "Experience the thrill of skydiving with a desert backdrop",
        Location = loc10,
        LocationId = 10,
        ActivityType = type15,
        Datetime = new DateTime(2024, 03, 10, 18, 0, 0),
        Price = 250
      };

      // Additional Trips

      Trip trip3 = new Trip
      {
        Name = "Beach Bliss",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "An unforgettable beach experience",
        Location = loc3,
        LocationId = 3,
        Budget = 450,
        Activities = new List<Activity> { act2 },
        Logo = "https://images.pexels.com/photos/789480/pexels-photo-789480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134",
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
      };
      Trip trip4 = new Trip
      {
        Name = "City of Lights",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Explore the charm of the city of lights",
        Location = loc4,
        LocationId = 4,
        Budget = 450,
        Activities = new List<Activity> { act3, act4 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/17350906/pexels-photo-17350906/free-photo-of-view-of-a-bridge-in-paris-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      };
      Trip trip5 = new Trip
      {
        Name = "Music Festival Extravaganza",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Immerse yourself in a music-filled weekend",
        Location = loc5,
        LocationId = 2,
        Budget = 450,
        Activities = new List<Activity> { act5, act6 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/1297311/pexels-photo-1297311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };



      Trip trip6 = new Trip
      {
        Name = "Island Paradise Getaway",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Escape to a tropical paradise",
        Location = loc6,
        LocationId = 6,
        Budget = 450,
        Activities = new List<Activity> { act7 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/278545/pexels-photo-278545.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip7 = new Trip
      {
        Name = "Tokyo Adventure",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Discover the vibrant culture of Tokyo",
        Location = loc7,
        LocationId = 7,
        Budget = 450,
        Activities = new List<Activity> { act8 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/1866145/pexels-photo-1866145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip8 = new Trip
      {
        Name = "Great Barrier Reef Expedition",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Explore the wonders of the underwater world",
        Location = loc8,
        LocationId = 8,
        Budget = 450,
        Activities = new List<Activity> { act9 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/923360/pexels-photo-923360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip9 = new Trip
      {
        Name = "Mystical Machu Picchu",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Journey to the ancient city in the mountains",
        Location = loc9,
        LocationId = 9,
        Budget = 450,
        Activities = new List<Activity> { act10 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/2115820/pexels-photo-2115820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip10 = new Trip
      {
        Name = "Dubai Extravaganza",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Experience the luxury and glamour of Dubai",
        Location = loc10,
        LocationId = 10,
        Budget = 450,
        Activities = new List<Activity> { act11 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/3767409/pexels-photo-3767409.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };

      Trip trip11 = new Trip
      {
        Name = "Iguazu Falls Adventure",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Witness the breathtaking Iguazu Falls",
        Location = loc11,
        LocationId = 11,
        Budget = 450,
        Activities = new List<Activity> { act7, act8 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/136542/pexels-photo-136542.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip12 = new Trip
      {
        Name = "Victoria Falls Expedition",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Experience the awe-inspiring Victoria Falls",
        Location = loc12,
        LocationId = 12,
        Budget = 450,
        Activities = new List<Activity> { act9, act10 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/255747/pexels-photo-255747.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip13 = new Trip
      {
        Name = "Canadian Wilderness Retreat",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Escape to the pristine wilderness of Banff",
        Location = loc13,
        LocationId = 13,
        Budget = 450,
        Activities = new List<Activity> { act11 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/2097281/pexels-photo-2097281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip14 = new Trip
      {
        Name = "Safari in Serengeti",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Embark on a thrilling safari adventure",
        Location = loc14,
        LocationId = 14,
        Budget = 450,
        Activities = new List<Activity> { act7, act8, act9 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/3985165/pexels-photo-3985165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip15 = new Trip
      {
        Name = "Galápagos Exploration",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Discover the unique wildlife of the Galápagos Islands",
        Location = loc15,
        LocationId = 15,
        Budget = 450,
        Activities = new List<Activity> { act10 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/4068879/pexels-photo-4068879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip16 = new Trip
      {
        Name = "Grand Canyon Expedition",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Experience the grandeur of the Grand Canyon",
        Location = loc16,
        LocationId = 16,
        Budget = 450,
        Activities = new List<Activity> { act11 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/1048095/pexels-photo-1048095.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip17 = new Trip
      {
        Name = "Ban Gioc Waterfall Trek",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Embark on a trek to the stunning Ban Gioc Waterfall",
        Location = loc17,
        LocationId = 17,
        Budget = 450,
        Activities = new List<Activity> { act7, act8, act9 },
        EmailList = new List<EmailList> { new EmailList {Email= "seppevaneynde2003@gmail.com" } }, 
        Logo = "https://images.pexels.com/photos/1342754/pexels-photo-1342754.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip18 = new Trip
      {
        Name = "Norwegian Fjords Cruise",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Cruise through the breathtaking Norwegian Fjords",
        Location = loc18,
        LocationId = 18,
        Budget = 450,
        Activities = new List<Activity> { act10 },
        EmailList = new List<EmailList> { new EmailList {Email= "seppevaneynde2003@gmail.com" } }, 
        Logo = "https://images.pexels.com/photos/3622181/pexels-photo-3622181.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip19 = new Trip
      {
        Name = "Namibian Desert Safari",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Embark on a thrilling desert safari in Namibia",
        Location = loc19,
        LocationId = 19,
        Budget = 450,
        Activities = new List<Activity> { act11 },
        EmailList = new List<EmailList> { new EmailList {Email="test" } }, 
        Logo = "https://images.pexels.com/photos/2823153/pexels-photo-2823153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };
      Trip trip20 = new Trip
      {
        Name = "Yellowstone Adventure",
        StartDate = DateTime.ParseExact("2024-03-10", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        EndDate = DateTime.ParseExact("2024-03-12", "yyyy-MM-dd", CultureInfo.InvariantCulture),
        IsPublic = true,
        Description = "Explore the wonders of Yellowstone National Park",
        Location = loc20,
        LocationId = 20,
        Budget = 450,
        Activities = new List<Activity> { act7, act8 },
        EmailList = new List<EmailList> { new EmailList {Email= "seppevaneynde2003@gmail.com" } }, 
        Logo = "https://images.pexels.com/photos/1551409/pexels-photo-1551409.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=134"
      };




      //add data to context
      
      context.Locations.Add(loc1);
      context.Locations.Add(loc2);
      context.Locations.Add(loc6);
      context.Locations.Add(loc7);
      context.Locations.Add(loc8);
      context.Locations.Add(loc9);
      context.Locations.Add(loc10);
      context.Locations.Add(loc11);
      context.Locations.Add(loc12);
      context.Locations.Add(loc13);
      context.Locations.Add(loc14);
      context.Locations.Add(loc15);
      context.Locations.Add(loc16);
      context.Locations.Add(loc17);
      context.Locations.Add(loc18);
      context.Locations.Add(loc19);
      context.Locations.Add(loc20);
      context.ActivityTypes.Add(type);
      context.ActivityTypes.Add(type2);
      context.ActivityTypes.Add(type3);
      context.ActivityTypes.Add(type4);
      context.ActivityTypes.Add(type5);
      context.ActivityTypes.Add(type6);
      context.ActivityTypes.Add(type7);
      context.ActivityTypes.Add(type8);
      context.ActivityTypes.Add(type9);
      context.ActivityTypes.Add(type10);
      context.ActivityTypes.Add(type11);
      context.ActivityTypes.Add(type12);
      context.ActivityTypes.Add(type14);
      context.ActivityTypes.Add(type15);
      context.ActivityTypes.Add(type16);
      context.ActivityTypes.Add(type18);
      context.Locations.Add(loc3);
      context.Locations.Add(loc4);
      context.Locations.Add(loc5);
      context.Activities.Add(act2);
      context.Activities.Add(act3);
      context.Activities.Add(act4);
      context.Activities.Add(act5);
      context.Activities.Add(act6);
      context.Activities.Add(act7);
      context.Activities.Add(act8);
      context.Activities.Add(act9);
      context.Activities.Add(act10);
      context.Activities.Add(act11);
      context.Trips.Add(trip3);
      context.Trips.Add(trip4);
      context.Trips.Add(trip5);
      context.Trips.Add(trip6);
      context.Trips.Add(trip7);
      context.Trips.Add(trip8);
      context.Trips.Add(trip9);
      context.Trips.Add(trip10);
      context.Trips.Add(trip11);
      context.Trips.Add(trip12);
      context.Trips.Add(trip13);
      context.Trips.Add(trip14);
      context.Trips.Add(trip15);
      context.Trips.Add(trip16);
      context.Trips.Add(trip17);
      context.Trips.Add(trip18);
      context.Trips.Add(trip19);
      context.Trips.Add(trip20);

      context.SaveChanges();
    }
  }
}

