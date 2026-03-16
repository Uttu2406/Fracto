using Fracto.Data.Context;
using Fracto.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.API.Controllers
{
    [Authorize(Roles="Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly FractoDbContext _context;
        public DoctorsController(FractoDbContext context) => _context = context;


        [HttpPost] // UC204 : DCreate
        public async Task<IActionResult> CreateDoctor(Doctor doctor)
        {
            var specExists = await _context.Specializations // check specs
                .AnyAsync(s => s.SpecializationId == doctor.SpecializationId);

            if (!specExists)
            {
                return BadRequest("Invalid Specialization ID. Please select a valid specialization.");
            }

            _context.Doctors.Add(doctor);

            await _context.SaveChangesAsync();
            return Ok(doctor);
        }

        [HttpGet] // UC204 : DRead 
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            return await _context.Doctors.Include(d => d.Specialization).ToListAsync();
        }

        [HttpPut("{id}")] // UC204 : DUpdate
        public async Task<IActionResult> PutDoctor(int id, Doctor doctor)
        {
            if (id != doctor.DoctorId) return BadRequest("ID mismatch.");

            var specExists = await _context.Specializations
                .AnyAsync(s => s.SpecializationId == doctor.SpecializationId); // cehcks specs

            if (!specExists)
            {
                return BadRequest("Validation Error: The selected Specialization ID does not exist.");
            }

            _context.Entry(doctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Doctors.Any(e => e.DoctorId == id)) return NotFound();
                throw;
            }

            return Ok("Doctor profile updated successfully.");
        }

        [HttpDelete("{id}")] // UC204 : DDelete
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return NotFound();

            _context.Doctors.Remove(doctor);

            await _context.SaveChangesAsync();
            return Ok("Doctor profile removed.");
        }


        [HttpGet("search")] // UC102, UC103, UC105, UC106 : Filter haru as mentioned
        [AllowAnonymous] // Bypassable re yayayay
        public async Task<ActionResult<IEnumerable<Doctor>>> SearchDoctors(
            [FromQuery] string? city,
            [FromQuery] int? specializationId,
            [FromQuery] double? minRating,
            [FromQuery] DateTime? date
        )

        {
            var query = _context.Doctors.Include(d => d.Specialization).AsQueryable();

            // UC102 : City matra
            if (!string.IsNullOrEmpty(city))
            {
                query = query.Where(d => d.City.ToLower() == city.ToLower());
            }

            // UC103 : Specialization matra
            if (specializationId.HasValue)
            {
                query = query.Where(d => d.SpecializationId == specializationId.Value);
            }

            // UC106 : Ratings matra
            if (minRating.HasValue)
            {
                query = query.Where(d => d.Rating != null && d.Rating >= minRating.Value);
            }

            // UC104 : Date re but refer to this again paxi
            if (date.HasValue)
            {
                if (date.Value.Date < DateTime.Now.Date)
                {
                    return BadRequest("Invalid Date: You cannot select a past date.");
                }

                query = query.Where(d => d.Appointments.Count(a => 
                a.AppointmentDate.Date == date.Value.Date && a.Status != "Cancelled") < 8); // Null thing fix vaisakyo if you forgot
            }

            var results = await query.ToListAsync();
            if (!results.Any())
            {
                return Ok(new { message = "No doctors found matching your criteria.", data = results });
            }

            return Ok(results);
        }


        [HttpGet("{id}")] // UC107 : Allow specific doctor matra
        [AllowAnonymous] // Bypassable re yayayay
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            var doctor = await _context.Doctors.Include(d => d.Specialization).FirstOrDefaultAsync(d => d.DoctorId == id);

            if (doctor == null)
            {
                return NotFound(new { message = "Profile Unavailable: The selected doctor could not be found." });
            }

            return Ok(doctor);
        }


    }
}
