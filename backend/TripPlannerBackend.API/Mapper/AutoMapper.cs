using AutoMapper;
using TripPlannerBackend.API.Dto;
using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.API.Mapper
{
  public class AutoMapper : Profile
  {
    public AutoMapper()
    {

      CreateMap<Trip, GetTripDto>()
      .ForMember(dest => dest.Location, opt => opt.MapFrom(src => new GetLocationDto
      {
        Id = src.Location.Id,
        City = src.Location.City,
        Address = src.Location.Address,
        Country = src.Location.Country
      }));

      CreateMap<EditTripDto, Trip>()
    .ForMember(dest => dest.EmailList, opt => opt.MapFrom(src => src.EmailList));

      CreateMap<GetActivityDto, Activity>()
    .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location));

      CreateMap<EditActivityDto, Activity>()
        .ForMember(dest=>dest.Location, opt => opt.MapFrom(src => src.Location));

      CreateMap<GetLocationDto, Location>();

      CreateMap<Activity, GetActivityDto>()
        .ForMember(dest => dest.ActivityType, opt => opt.MapFrom(src => new GetActivityTypeDto
      {
        Id = src.ActivityType.Id,
        Name = src.ActivityType.Name
      })).ForMember(dest=> dest.Location, opt => opt.MapFrom(src=> new GetLocationDto {
        Id = src.Location.Id,
        City = src.Location.City,
        Address = src.Location.Address,
        Country = src.Location.Country
      }));

      //add map for create activity
      CreateMap<Activity, CreateActivityDto>()
        .ForMember(dest => dest.ActivityType, opt => opt.MapFrom(src => new GetActivityTypeDto
        {
          Id = src.ActivityType.Id,
          Name = src.ActivityType.Name
        }))
        .ForMember(dest => dest.Location, opt => opt.MapFrom(src => new GetLocationDto
        {
          Id = src.Location.Id,
          City = src.Location.City,
          Address = src.Location.Address,
          Country = src.Location.Country
        }));
      CreateMap<CreateTripDto, Trip>();
      CreateMap<CreateLocationDto, Location>();

      CreateMap<CreateActivityDto, Activity>()
     .ForMember(dest => dest.ActivityType, opt => opt.MapFrom(src => src.ActivityType))
     .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location));

      CreateMap<Trip, EditTripDto>();


      CreateMap<CreateActivityTypeDto, ActivityType>();
      CreateMap<ActivityType, GetActivityTypeDto>();
      CreateMap<GetActivityTypeDto,ActivityType>();
      CreateMap<Location,GetLocationDto>();
      CreateMap<EmailList, GetEmailDto>();
      CreateMap<GetEmailDto, EmailList>();
      CreateMap<CreateEmailDto, EmailList>();
    }
  }
}
