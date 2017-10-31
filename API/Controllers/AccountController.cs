using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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

        [HttpGet("users")]
        public IEnumerable<ApplicationUser> GetAll()
        {
            return _unitOfWork.Users.GetAll();
        }

        [HttpGet("users/{id}")]
        public IActionResult GetUser(string id)
        {
            var user = _unitOfWork.Users.Get(id).Result;
            if (user == null)
            {
                return NotFound();
            }
            return new ObjectResult(user);
        }

        [HttpGet("users/{id}/addresses")]
        public IActionResult GetAdresses(string id)
        {
            var user = _unitOfWork.Users.Get(id).Result;
            if (user == null)
            {
                return NotFound();
            }
            var addresses = user.Addresses;
            return new ObjectResult(addresses);
        }

        [HttpPost("users/{id}/addresses")]
        public IActionResult AddAddress(string id, [FromBody] UserAddress address)
        {
            var user = _unitOfWork.Users.Get(id).Result;
            if (user == null)
            {
                return NotFound();
            }
            var addresses = user.Addresses;
            addresses.Add(address);

            user.Addresses = addresses;
            _unitOfWork.Complete();

            return new ObjectResult(user.Addresses);
        }

        [HttpDelete("users/{userId}/addresses/{addressId}")]
        public IActionResult DeleteAddress(string userId, int addressId)
        {
            var user = _unitOfWork.Users.Get(userId).Result;
            if (user == null)
            {
                return NotFound();
            }

            var address = user.Addresses.Find(a => a.Id == addressId);
            if (address == null)
            {
                return NotFound();
            }
            user.Addresses.Remove(address);
            _unitOfWork.Complete();

            return new NoContentResult();
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

        [HttpPost("users/adminify/{id}")]
        public IActionResult Adminify(string id)
        {
            return new ObjectResult(_unitOfWork.Users.MakeAdmin(id).Result);
        }
    }
}
