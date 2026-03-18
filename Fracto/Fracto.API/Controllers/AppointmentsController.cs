using Fracto.Data.Context;
using Fracto.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly FractoDbContext _context;
        public AppointmentsController(FractoDbContext context) => _context = context;


        [HttpGet("slots")] // UC108 : Slots? (yes) // Not working wtf // Update : Display gonnnn
        [AllowAnonymous]
        public async Task<IActionResult> GetAvailableSlots(int doctorId, DateTime date)
        { 
            var allSlots = new List<string> { "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00" }; // slots defn

            var bookedSlots = await _context.Appointments.Where(
                a => a.DoctorId == doctorId &&a.AppointmentDate.Date == date.Date && a.Status != "Cancelled"
            ).Select(a => a.TimeSlot).ToListAsync(); // elle chai booked slots check garxa ig

            var availableSlots = allSlots.Except(bookedSlots).ToList();

            if (!availableSlots.Any())
            {
                return Ok(new { message = "Doctor Unavailable", slots = availableSlots });
            }

            return Ok(availableSlots);
        }



        [HttpGet] //Search func
        public async Task<IActionResult> GetAllAppointments()
        {
            var appointments = await _context.Appointments
                .Include(a => a.Doctor)
                .Include(a => a.User)
                .ToListAsync();
            return Ok(appointments);
        }


        [HttpPost] // UC109, UC110, UC205, UC206 (Merged later)
        public async Task<IActionResult> BookAppointment(Appointment appointment) 
        { 
            if (appointment.AppointmentDate.Date < DateTime.Now.Date)
            {
                return BadRequest("Invalid Date: Appointments cannot be booked for the past.");
            }

            var isSlotTaken = await _context.Appointments.AnyAsync(a => // correct eror paxi hai (rer1) // Done :)
                a.DoctorId == appointment.DoctorId &&
                a.AppointmentDate.Date == appointment.AppointmentDate.Date &&
                a.TimeSlot == appointment.TimeSlot &&
                a.Status != "Cancelled");

            if (isSlotTaken)
            {
                return BadRequest("This slot is no longer available.");
            }

            appointment.Status = "Confirmed"; // yay

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            var doctor = await _context.Doctors.FindAsync(appointment.DoctorId);

            return Ok
                (
                    new
                    {
                        message = "Appointment booked and confirmed successfully!",
                        confirmationDetails = new
                        {
                            Doctor = doctor?.Name,
                            Date = appointment.AppointmentDate.ToShortDateString(),
                            Time = appointment.TimeSlot,
                            Status = appointment.Status
                        }
                    }
                );
        }


        [HttpPut("{id}/cancel")] // UC111, UC207 : Vana pencil timro appointment cancel (please dont kick me)
        public async Task<IActionResult> CancelAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound(new { message = "Appointment not found." });
            }

            if (appointment.AppointmentDate.Date < DateTime.Now.Date)
            {
                return BadRequest("Cannot cancel appointments that have already passed.");
            }

            
            var currentUserId = int.Parse(User.FindFirst("UserId")?.Value ?? "0"); // jwt le user verify garne?

            if (!User.IsInRole("Admin") /* "User" haina laata!!! */ && appointment.UserId != currentUserId) 
            {
                return Forbid();
            }

            appointment.Status = "Cancelled";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Appointment has been successfully cancelled." });
        }


    }
}
