using System.ComponentModel.DataAnnotations;

namespace Fracto.Data.Entities
{
    public class User
    {
        [Key]
        public int UserId { get; set; }


        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }


        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }


        [Required]
        public string Password{ get; set; }


        [Required]
        public string Role { get; set; }


        public ICollection<Appointment>? Appointments { get; set; } = new List<Appointment>(); // ? = instead of all data chaiyeko matra bolauxa

    }
}
