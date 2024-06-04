using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TripPlannerBackend.API.Dto;
using TripPlannerBackend.DAL;
using TripPlannerBackend.DAL.Entity;
using TripPlannerBackend.DAL.Initializer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(typeof(Program));

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<TripPlannerDbContext>(options =>
    options.UseSqlServer(connectionString));


builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();


builder.Services.AddControllers();
builder.Services.AddSwaggerService();

var app = builder.Build();

app.UseCors(options =>
{
  options.AllowAnyHeader();
  options.AllowAnyMethod();
  //options.AllowAnyOrigin();
  options.WithOrigins("http://localhost:4200", "https://localhost:4200", "https://radiant-crumble-59f40c.netlify.app/");
});

app.UseAuthorization();



app.UseCors("TripApp");


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var tripContext = scope.ServiceProvider.GetRequiredService<TripPlannerDbContext>();
    DBInitializer.Initialize(tripContext);
}

app.Run();
