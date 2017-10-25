using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using API.Models;
using API.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private IUnitOfWork _unitOfWork;

        public AccountController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Credentials Credentials)
        {
            if (ModelState.IsValid)
            {
                return await _unitOfWork.Users.Register(Credentials);
            }
            return _unitOfWork.Users.Error("Unexpected error");
        }

        [HttpPost("login")]
        public async Task<IActionResult> SignIn([FromBody] Credentials Credentials)
        {
            if (ModelState.IsValid)
            {
                return await _unitOfWork.Users.SignIn(Credentials);
            }
            return _unitOfWork.Users.Error("Unexpected error");
        }
    }
}
