using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;   
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using DatathonNAPI.Interfaces;
using DatathonNAPI.Models;
using DatathonNAPI.DTO;

namespace DatathonNAPI.Services
{
    public class LogIn : ILogIn
    {
        private readonly HeyBContext _context;
        private readonly string key;
        private readonly string issuer;
        private readonly string audience;
        private readonly int expirationTime;
        public LogIn(HeyBContext context, string key, string issuer, string audience, int expirationTime)
        {
            this.key = key;
            this.issuer = issuer;
            this.audience = audience;
            this.expirationTime = expirationTime;
            _context = context;
        }
        public async Task<LogInResponse?> Authentification(LogInRequest LogInRequest)
        {
            if(LogInRequest is null  || string.IsNullOrEmpty(LogInRequest.Password)){
            return null;
            }
        //This Auth can be changed later to use hash and salt 
            var user = await _context.Admins.FirstOrDefaultAsync(u => u.IdUser == LogInRequest.UserID && u.Password == LogInRequest.Password);
            if(user is null)
            return null;
            var EndingTime = DateTime.UtcNow.AddMinutes(expirationTime);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.IdUser.ToString()),
                }),
                Expires = EndingTime,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(token);
            return new LogInResponse{
                Name = user.IdUser,
                Token = accessToken,
                TimeExpires = (int)EndingTime.Subtract(DateTime.UtcNow).TotalSeconds
            };
        }
        
    }
}