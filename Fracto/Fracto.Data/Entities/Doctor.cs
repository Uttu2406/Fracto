using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Fracto.Data.Entities
{
    public class Doctor
    {
        [Key]
        public int DoctorId { get; set; }


        [Required]
        [MaxLength(100)]
        public string Name { get; set; } 


        [Required]
        public string City { get; set; }


        public double? Rating { get; set; }


        [Required]
        public int SpecializationId { get; set; }

        [ForeignKey("SpecializationId")]
        [JsonIgnore]
        public Specialization? Specialization { get; set; }


        public ICollection<Appointment>? Appointments { get; set; } = new List<Appointment>(); // ? 

    }
}
