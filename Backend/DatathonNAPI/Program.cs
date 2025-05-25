using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using DatathonNAPI.DTO;
using DatathonNAPI.Models;
using DatathonNAPI.Services;
using DatathonNAPI.Interfaces;


var builder = WebApplication.CreateBuilder(args);


var connectionString = Environment.GetEnvironmentVariable("DBConnectionString");
var encodingKey = Environment.GetEnvironmentVariable("EncodingKey");

if (encodingKey is null || connectionString is null || encodingKey == "" || connectionString == "")
{
    throw new Exception("Environment variables not set. Please set 'DBConnectionString' and 'EncodingKey'.");
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string Audience = builder.Configuration["JwtSettings:Audience"] ?? string.Empty;
string Issuer = builder.Configuration["JwtSettings:Issuer"] ?? string.Empty;
int TokenExpirationTime = int.Parse(builder.Configuration["JwtSettings:Time"] ?? "0");

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;

    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = Audience,
        ValidIssuer = Issuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(encodingKey)),
    };
});

builder.Services.AddAuthorization();


//Dependency Injection
builder.Services.AddScoped<ILogIn>(provider => 
    new LogIn(provider.GetRequiredService<HeyBContext>(), encodingKey, Issuer, Audience, TokenExpirationTime));
builder.Services.AddScoped<IUserService, UserService>();
// Configure Entity Framework with MySQL

builder.Services.AddDbContext<HeyBContext>(options =>
    options.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(8, 0, 32)) // Adjust MySQL version as needed
    ));



var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();





app.Run();

