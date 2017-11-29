using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

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

        [HttpPut("users/{id}")]
        public IActionResult UpdateUser(string id, [FromBody] ApplicationUser item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var user = _unitOfWork.Users.Get(id).Result;
            if (user == null)
            {
                return NotFound();
            }

            user.FirstName = item.FirstName;
            user.LastName = item.LastName;
            _unitOfWork.Complete();

            return new NoContentResult();
        }

        [HttpPost("users/delete/{id}")]
        public IActionResult DeleteUser(string id)
        {
            var user = _unitOfWork.Users.Get(id).Result;
            if (user == null)
            {
                return NotFound();
            }

            user.IsDisabled = true;

            _unitOfWork.Complete();
            return Ok();
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

        [HttpGet("users/{userId}/addresses/{addressId}")]
        public IActionResult GetAddress(string userId, int addressId)
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

            return new ObjectResult(address);
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

        [HttpPut("users/{userId}/addresses/{id}")]
        public IActionResult Update(string userId, int id, [FromBody] UserAddress address)
        {
            var user = _unitOfWork.Users.Get(userId).Result;

            if (user == null)
            {
                return BadRequest();
            }

            var userAddress = user.Addresses.Find(a => a.Id == id);
            if (userAddress == null)
            {
                return NotFound();
            }

            userAddress.City = address.City;
            userAddress.Street = address.Street;
            userAddress.StreetNumber = address.StreetNumber;
            userAddress.ZipCode = address.ZipCode;
            _unitOfWork.Complete();

            return new OkResult();
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

        [HttpGet("users/{id}/cart")]
        public IActionResult GetCart(string id)
        {
            var user = _unitOfWork.Users.Get(id).Result;
            if (user == null)
            {
                return NotFound();
            }
            var cartId = user.ShoppingCart.Id;
            var cart = _unitOfWork.ShoppingCarts.Get(cartId);

            var products = new List<Product>();
            if (cart.Products == null)
            {
                return NoContent();
            }

            foreach (var product in cart.Products)
            {
                var existingProduct = _unitOfWork.Products.Find(
                    p => p.Id == product.ProductId
                ).FirstOrDefault();

                if (existingProduct != null)
                {
                    products.Add(existingProduct);
                }
            }

            return Ok(products);
        }

        [HttpPost("users/{userId}/cart/{productId}")]
        public IActionResult AddProductToCart(string userId, int productId)
        {
            var user = _unitOfWork.Users.Get(userId).Result;
            if (user == null)
            {
                return NotFound();
            }
            var product = _unitOfWork.Products.Get(productId);
            if (product == null)
            {
                return NotFound();
            }
            var shoppingCartId = user.ShoppingCart.Id;

            var existingProduct = from p in user.ShoppingCart.Products
                                  where p.ProductId == product.Id
                                  select p;

            if (existingProduct == null)
            {
                user.ShoppingCart.Products.Add(new ShoppingCartProduct
                {
                    ShoppingCart = user.ShoppingCart,
                    ShoppingCartId = shoppingCartId,

                    Product = product,
                    ProductId = product.Id,

                    Quantity = 1
                });
            }
            else
            {
                existingProduct.First().Quantity += 1;
            }

            _unitOfWork.Complete();
            return Ok();
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
            var user = _unitOfWork.Users.Get(id).Result;
            user.IsAdmin = true;
            _unitOfWork.Complete();

            return new ObjectResult(_unitOfWork.Users.MakeAdmin(id).Result);
        }

        [HttpGet("users/amount")]
        public IActionResult GetAmount(){
            return Ok(_unitOfWork.Users.GetAmount()); 
        }

        [HttpGet("users/withpagination/{index}/{pagesize}")]
        public IActionResult GetPaginated(int index, int pagesize = 10){
            return Ok(_unitOfWork.Users.GetAllPaginated(index, pagesize)); 
        }
    }
}
