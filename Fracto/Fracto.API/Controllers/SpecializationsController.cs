using Fracto.Data.Context;
using Fracto.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Fracto.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationsController : ControllerBase
    {
        private readonly FractoDbContext _context;
        public SpecializationsController(FractoDbContext context) => _context = context;


        [HttpPost] // UC203 : SCreate
        public async Task<ActionResult<Specialization>> PostSpecialization(Specialization spec)
        {
            if (await _context.Specializations.AnyAsync(s => s.SpecializationName.ToLower() == spec.SpecializationName.ToLower()))
            {
                return BadRequest("This specialization already exists.");
            }

            _context.Specializations.Add(spec);
            await _context.SaveChangesAsync();
            return Ok(spec);
        }

        [HttpGet] // UC203 : SRead
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Specialization>>> GetSpecializations()
        {
            return await _context.Specializations.ToListAsync();
        }

        [HttpPut("{id}")] // UC203 : SUpdate
        public async Task<ActionResult> PutSpecialization(int id, Specialization spec)
        {
            if (id != spec.SpecializationId) return BadRequest();

            _context.Entry(spec).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")] // UC203 : SDelete
        public async Task<IActionResult> DeleteSpecialization(int id)
        {
            var spec = await _context.Specializations.Include(s => s.Doctors).FirstOrDefaultAsync(s => s.SpecializationId == id);

            if (spec == null) 
            { 
                return NotFound(); 
            }

            if (spec.Doctors != null && spec.Doctors.Any())
            {
                return BadRequest("Cannot delete specialization because it is linked to active doctor profiles.");
            }

            _context.Specializations.Remove(spec);
            await _context.SaveChangesAsync();

            return Ok("Specialization deleted successfully.");



        }
    }
}