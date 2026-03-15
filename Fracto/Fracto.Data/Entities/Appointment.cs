using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Fracto.Data.Entities
{
    public class Appointment
    {
        [Key]
        public int AppointmentId { get; set; }


        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public User? User { get; set; }


        [Required]
        public int DoctorId { get; set; }
        [ForeignKey("DoctorId")]
        [JsonIgnore]
        public Doctor? Doctor { get; set; }


        [Required]
        public DateTime AppointmentDate { get; set; }


        [Required]
        public string TimeSlot { get; set; }


        [Required]
        public string Status { get; set; }
                    
    }
}
