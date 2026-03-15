using Fracto.Data.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fracto.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly FractoDbContext _context;
        public AppointmentsController(FractoDbContext context) => _context = context;
    }
}
