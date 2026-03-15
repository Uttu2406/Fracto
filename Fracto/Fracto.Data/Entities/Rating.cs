using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Fracto.Data.Entities
{
    public class Rating
    {
        [Key]
        public int RatingId { get; set; }


        [Required]
        public int DoctorId { get; set; }
        [ForeignKey("DoctorId")]

        [JsonIgnore]
        public Doctor? Doctor { get; set; }


        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public User? User { get; set; }


        [Required]
        [Range(1, 5)]
        public int DoctorRating { get; set; } 
        // Note to self: No fk here because we already declared one above. Cant have >1 fk, ig.
       
    }
}
