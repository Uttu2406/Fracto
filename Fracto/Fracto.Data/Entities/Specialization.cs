using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace Fracto.Data.Entities
{
    public class Specialization
    {
        [Key]
        public int SpecializationId { get; set; }


        [Required]
        [MaxLength(100)]
        public string SpecializationName { get; set; }


        public ICollection<Doctor>? Doctors { get; set; } = new List<Doctor>(); // ?
    }
}
