using Fracto.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Fracto.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Fracto.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly FractoDbContext _context;
        public UsersController(FractoDbContext context) => _context = context;


        [HttpPost] // UC202 : UCreate
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (await _context.Users.AnyAsync(u => u.EmailAddress == user.EmailAddress || u.UserName == user.UserName))
            {
                return BadRequest("User with this email or username already exists.");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpGet] // UC202 : URead
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpPut("{id}")] // UC202 : UUpdate
        public async Task<ActionResult> PutUsers(int id, User user)
        {
            if (id != user.UserId) return BadRequest();

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")] // UC202 : UDelete
        public async Task<IActionResult> DeleteUser(int id)
        {
            var currentAdminId = User.FindFirst("UserId")?.Value;

            if (id.ToString() == currentAdminId) // NOt deleting self hehe, had to learn the hard way
            {
                return BadRequest("You cannot delete your own admin account.");
            }

            var hasAppointments = await _context.Appointments.AnyAsync(a => a.UserId == id); // NOT deleting plebs with appointment
            if (hasAppointments)
            {
                return BadRequest("Cannot delete user with existing appointments. Cancel them first.");
            }

            var userDelete = await _context.Users.FindAsync(id);

            if (userDelete == null) return NotFound();

            _context.Users.Remove(userDelete);
            await _context.SaveChangesAsync();

            return Ok("User deleted successfully.");
        }




    } 
}
