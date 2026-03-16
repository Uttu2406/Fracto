using Fracto.Data.Context;
using Fracto.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly FractoDbContext _context;
        public RatingsController(FractoDbContext context) => _context = context;

        [HttpPost]
        public async Task<IActionResult> PostRating(Rating rating)
        {
            // Check if user already rated this doctor
            var already = await _context.Ratings
                .AnyAsync(r => r.DoctorId == rating.DoctorId && r.UserId == rating.UserId);

            if (already)
                return BadRequest("You have already rated this doctor.");

            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            // Recalculate doctor's average rating
            var avg = await _context.Ratings
                .Where(r => r.DoctorId == rating.DoctorId)
                .AverageAsync(r => (double)r.DoctorRating);

            var doctor = await _context.Doctors.FindAsync(rating.DoctorId);
            if (doctor != null)
            {
                doctor.Rating = Math.Round(avg, 1);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Rating submitted!", averageRating = avg });
        }
    }
}