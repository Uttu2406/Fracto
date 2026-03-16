using Fracto.API.Services;
using Fracto.Data.Context;
using Fracto.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly FractoDbContext _context;
        private readonly TokenService _tokenService;

        public AccountController(FractoDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }


        [HttpPost("register")] // UC101 ra UC201 : Register
        public async Task<ActionResult<User>> Register(User user)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == user.UserName))
            {
                return BadRequest("Username is already taken");
            }

            if (await _context.Users.AnyAsync(x => x.EmailAddress == user.EmailAddress))
            {
                return BadRequest("Email is already registered");
            }

            user.Role = "User";

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful" });
        }


        [HttpPost("login")] // UC101 ra UC201 : Login
        public async Task<ActionResult<string>> Login(User loginInfo)
        { 
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.EmailAddress==loginInfo.EmailAddress);

            if (user == null || user.Password != loginInfo.Password)
            {
                return Unauthorized("Invalid Credentials");
            }

            return _tokenService.CreateToken(user);
        }
    }
}
