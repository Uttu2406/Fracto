using Microsoft.AspNetCore.Mvc;

namespace Fracto.API.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
