using Fracto.Data.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fracto.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly FractoDbContext _context;
        public DoctorsController(FractoDbContext context) => _context = context;
    }
}
