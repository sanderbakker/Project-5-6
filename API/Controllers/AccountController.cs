using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System;
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

        [HttpPost("users/enable/{id}")]
        public IActionResult EnableUser(string id)
        {
            var user = _unitOfWork.Users.Get(id).Result;
            if (user == null)
            {
                return NotFound();
            }

            user.IsDisabled = false;

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

        [HttpDelete("users/{userId}/cart/{productId}")]
        public IActionResult DeleteProductFromCart(string userId, int productId) {
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

            var cartId = _unitOfWork.ShoppingCarts.Find(s => s.User.Id == user.Id).FirstOrDefault().Id;
            var cart = _unitOfWork.ShoppingCarts.GetWithProductsAndCustomizations(cartId);

            var existingProduct = cart.Products.Where(p => p.ProductId == productId).FirstOrDefault();

            var customizations = cart.Customizations.Where(p => p.ProductId == productId && p.ShoppingCartId == cartId).ToArray(); 

            if (existingProduct == null) {
                return NotFound();
            }
            
            if(customizations != null){
                foreach(var item in customizations){
                    cart.Customizations.Remove(item); 
                }
            }

            existingProduct.Product.Stock += existingProduct.Quantity; 
            
            cart.Products.Remove(existingProduct);
            
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
            var cartId = _unitOfWork.ShoppingCarts.Find(s => s.User.Id == user.Id).FirstOrDefault().Id;
            var cart = _unitOfWork.ShoppingCarts.GetWithProductsAndCustomizations(cartId);

            var result = new Dictionary<string, dynamic>();
            float totalPrice = 0;
            float totalQuantity = 0;
            var products = new Dictionary<int, Dictionary<string, dynamic>>();
            foreach (var product in cart.Products)
            {
                var productDetail = _unitOfWork.Products.Get(product.ProductId);
                var customizations = cart.Customizations.Where(p => p.ProductId == product.ProductId);
                var customizationsDict = new Dictionary<int, Dictionary<string, string>>();  

                totalPrice      += productDetail.Price * product.Quantity;
                totalQuantity   += product.Quantity;

                foreach(var customization in customizations){
                    var currentCustomizaton = _unitOfWork.Customizations.Get(customization.CustomizationId); 
                    
                    var customizationDetails = new Dictionary<string, string>();                 
                    
                    customizationDetails.Add("name", currentCustomizaton.Name);
                    customizationDetails.Add("price", currentCustomizaton.Price.ToString());
                    
                    customizationsDict.Add(currentCustomizaton.Id, customizationDetails); 

                    totalPrice += currentCustomizaton.Price; 
                }

                var productDetailDict = new Dictionary<string, dynamic>();
                    productDetailDict.Add("name", productDetail.Name);
                    productDetailDict.Add("price", productDetail.Price.ToString());
                    productDetailDict.Add("quantity", product.Quantity.ToString());
                    productDetailDict.Add("customizations", customizationsDict); 
                    
                
                products.Add(product.ProductId, productDetailDict);
                
            }

            result.Add("total_price", totalPrice.ToString());
            result.Add("total_quantity", totalQuantity.ToString());
            result.Add("products", products);

            return new JsonResult(result);
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

            var cartId = _unitOfWork.ShoppingCarts.Find(s => s.User.Id == user.Id).FirstOrDefault().Id;
            var cart = _unitOfWork.ShoppingCarts.GetWithProducts(cartId);

            var existingProduct = cart.Products.Where(p => p.ProductId == productId).FirstOrDefault();

            if(product.Stock > 0)
            {
                if (existingProduct == null)
                {
                    
                        cart.Products.Add(new ShoppingCartProduct
                        {
                            ShoppingCartId = cart.Id,
                            ShoppingCart = cart,
                            ProductId = product.Id,
                            Product = product,
                            Quantity = 1
                        });
                        product.Stock -= 1; 
                    
                }
                else
                {
                    existingProduct.Quantity += 1;
                    existingProduct.Product.Stock -= 1; 
                }
            }
            _unitOfWork.Complete();
            return new JsonResult("ok");
        }
        [HttpPost("users/{userId}/cart/{productId}/{customizationId}")]
        public IActionResult AddCustomizationToProductInCart(string userId, int productId, int customizationId){
            var user = _unitOfWork.Users.Get(userId).Result;
            if (user == null)
            {
                return NotFound();
            }

            var cartId = _unitOfWork.ShoppingCarts.Find(s => s.User.Id == user.Id).FirstOrDefault().Id;
            var cart = _unitOfWork.ShoppingCarts.GetWithProductsAndCustomizations(cartId);            
            var shoppingCartProduct = cart.Products.Where(x => x.ProductId == productId).FirstOrDefault(); 

            if(shoppingCartProduct == null){
                return NotFound(); 
            }
            var product = _unitOfWork.Products.Get(shoppingCartProduct.ProductId); 

            var customization = _unitOfWork.Customizations.Get(customizationId); 
            if(customization == null){
                return NotFound(); 
            }

            if(cart.Customizations == null){
                cart.Customizations = new List<ShoppingCartCustomizations>(); 
            }

            var existingCustomization = cart.Customizations.Where(p => p.CustomizationId == customizationId).FirstOrDefault();
            
            if(existingCustomization == null) {
                cart.Customizations.Add( new ShoppingCartCustomizations {
                    Product = product,
                    ProductId = productId,
                    Customization = customization,
                    CustomizationId = customizationId,
                    ShoppingCart = cart,
                    ShoppingCartId = cartId
                }); 
            }

            _unitOfWork.Complete();
            return Ok(); 
        }

        [HttpDelete("users/{userId}/cart/{productId}/{customizationId}")]
        public IActionResult RemoveCustomizationFromProductInShoppingCart(string userId, int productId, int customizationId){
            var user = _unitOfWork.Users.Get(userId).Result;
            if (user == null)
            {
                return NotFound();
            }

            var customization = _unitOfWork.Customizations.Get(customizationId);
            if (customization == null)
            {
                return NotFound();
            }            

            var cartId = _unitOfWork.ShoppingCarts.Find(s => s.User.Id == user.Id).FirstOrDefault().Id;
            var cart = _unitOfWork.ShoppingCarts.GetWithProductsAndCustomizations(cartId);

            var existingCustomization = cart.Customizations.Where(p => p.CustomizationId == customizationId).FirstOrDefault();

            if (existingCustomization == null) {
                return NotFound();
            }
            
            cart.Customizations.Remove(existingCustomization);
            
            _unitOfWork.Complete();

            return Ok();
        }

        [HttpPut("users/{userId}/cart/{productId}/{quantity}")]
        public IActionResult UpdateCartProduct(string userId, int productId, int quantity) {

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

            var cartId = _unitOfWork.ShoppingCarts.Find(s => s.User.Id == user.Id).FirstOrDefault().Id;
            var cart = _unitOfWork.ShoppingCarts.GetWithProducts(cartId);

            var existingProduct = cart.Products.Where(p => p.ProductId == productId).FirstOrDefault();

            if (existingProduct == null)
            {
                return NotFound();
            }

            if(existingProduct.Product.Stock > 0 )
            {
                var substract = (quantity - existingProduct.Quantity);
                existingProduct.Quantity = quantity;
                existingProduct.Product.Stock -=  substract;
            }

            _unitOfWork.Complete();
            return Ok();

        }

        [HttpGet("users/{id}/orders")]
        public IActionResult GetOrders(string id)
        {
            var user = _unitOfWork.Users.Get(id).Result;
            if (user == null)
            {
                return NotFound();
            }
            var orders = user.Orders;

            _unitOfWork.Complete();
            return new JsonResult(orders);
        }

        [HttpGet("users/{id}/order/{orderId}")]
        public IActionResult GetOrder(string id, int orderId)
        {
            var user = _unitOfWork.Users.Get(id).Result;
            if(user == null) 
            {
                return NotFound();
            }
            var order = user.Orders.Find(o => o.OrderId == orderId);
            var orderProducts = _unitOfWork.Orders.GetWithProducts(orderId);
            var orderCustomizations = _unitOfWork.Orders.GetWithCustomizations(orderId);
            

            var returnArray = new Dictionary<string, object>();              
            returnArray.Add("order_id", order.OrderId);
            returnArray.Add("shipping_provider", order.ShippingProviderString);
            returnArray.Add("payment_provider", order.PaymentProviderString);
            returnArray.Add("total_price", order.totalPrice);
            returnArray.Add("products", orderProducts);
            returnArray.Add("customizations", orderCustomizations); 

            return new JsonResult(returnArray);
        }

        [HttpPost("users/{userId}/orders/add")]
        public IActionResult AddOrder(string userId, [FromBody] Dictionary<string, string> providers)
        {
            var user = _unitOfWork.Users.Get(userId).Result;
            if (user == null)
            {
                return NotFound();
            }

            var cartId = _unitOfWork.ShoppingCarts.Find(s => s.User.Id == user.Id).FirstOrDefault().Id;            
            var cart = _unitOfWork.ShoppingCarts.GetWithProductsAndCustomizations(cartId);
            float total = 0;

            foreach (var product in cart.Products)
            {
                var productDetail = _unitOfWork.Products.Get(product.ProductId);
                total += productDetail.Price * product.Quantity;
            }

            foreach(var customization in cart.Customizations){
                var details = _unitOfWork.Customizations.Get(customization.CustomizationId);
                total += details.Price;  
            }

            var PaymentProvider  = providers["paymentProvider"].ParseEnum<Order.PaymentProviders>();
            var ShippingProvider = providers["shipmentProvider"].ParseEnum<Order.ShippingProviders>(); 
            var Status = "Processing".ParseEnum<Order.Statuses>();

            user.Orders.Add(new Order
                {
                    PaymentProvider = PaymentProvider,
                    ShippingProvider = ShippingProvider,
                    Status = Status,
                    totalPrice = total
                }
            );
            var order = user.Orders.LastOrDefault();

            foreach (var product in cart.Products.ToList())
            {
                if (order.Products == null)
                {
                    order.Products = new List<OrderProduct>();
                }

                var customizations = cart.Customizations.Where(c => c.ProductId == product.ProductId).ToList();

                foreach(var customization in customizations){
                    if(order.Customizations == null){

                        order.Customizations = new List<OrderCustomization>();
                    }

                    order.Customizations.Add( new OrderCustomization {
                        OrderId = order.OrderId,
                        ProductId = product.ProductId,
                        CustomizationId = customization.CustomizationId
                    });

                    cart.Customizations.Remove(customization); 
                }
                order.Products.Add(new OrderProduct
                {
                    ProductId = product.ProductId,
                    OrderId = order.OrderId,

                    Quantity = product.Quantity
                });
                cart.Products.Remove(product);                                
            }

            _unitOfWork.Orders.Add(order);
            _unitOfWork.Complete();

            return new JsonResult("ok");
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

        [HttpPost("users/adminify/disable/{id}")]
        public IActionResult DisableAdmin(string id)
        {
            var user = _unitOfWork.Users.Get(id).Result;
            user.IsAdmin = false;
            _unitOfWork.Complete();

            return new ObjectResult(_unitOfWork.Users.DisableAdmin(id).Result);
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
