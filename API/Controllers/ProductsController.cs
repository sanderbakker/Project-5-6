using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

using API.Services;
using API.Models;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private IUnitOfWork _unitOfWork;

        public ProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            return _unitOfWork.Products.GetAll();
        }

        [HttpGet("amount")]
        public IActionResult GetAmount()
        {
            return Ok(_unitOfWork.Products.GetAmount());
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public IActionResult Get(int id)
        {
            var item = _unitOfWork.Products.Get(id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpGet("withcustomizations/{id}")]
        public IActionResult GetWithCustomizations(int id){
            var item = _unitOfWork.Products.Get(id);
            if (item == null){
                return NotFound(); 
            }
            var product = new Dictionary<string, object>();  
            
            var result = new List<object>(); 

            var customizationProducts = _unitOfWork.Customizations.GetWithCustomizations(id); 
            
            if(customizationProducts == null)
            {
                return NotFound(); 
            }
            
            foreach (var productCustomization in customizationProducts)
            {
                result.Add(productCustomization); 
            }
             
            product.Add("name", item.Name);
            product.Add("description", item.Description);
            product.Add("categoryString", item.CategoryString);
            product.Add("price", item.Price);
            product.Add("stock", item.Stock);
            product.Add("id", item.Id);
            product.Add("image1", item.Image1);
            product.Add("image2", item.Image2);
            product.Add("image3", item.Image3); 
            product.Add("customizations", result);
             
            return new ObjectResult(product);
        }

        [HttpGet("paginated/{index}/{pagesize?}")]
        public IActionResult GetPaginated(int index, int pagesize = 10)
        {
            return new ObjectResult(_unitOfWork.Products.GetAllPaginated(index, pagesize));
        }

        [HttpGet("categories", Name = "GetCategories")]
        public IActionResult GetCategories()
        {
            return new ObjectResult(_unitOfWork.Products.GetCategories());
        }

        [HttpGet("category/{category}")]
        public IActionResult GetCategory(string category) {
            if (!Enum.IsDefined(typeof(Product.Categories), category)) {
                return new ObjectResult(null);
            }

            return new JsonResult(category);
        }

        [HttpGet("withcategory/{category}")]
        public IActionResult GetWithCategory(string category)
        {
            if (!Enum.IsDefined(typeof(Product.Categories), category))
            {
                return NotFound();
            }

            var cat = category.ParseEnum<Product.Categories>();
            var products = _unitOfWork.Products.GetWithCategory(cat);

            return new ObjectResult(products);
        }

        [HttpGet("withcategorypaginated/{category}/{index}/{pagesize?}")]
        public IActionResult GetWithCategoryPaginated(string category, int index, int pagesize = 10)
        {
            if (!Enum.IsDefined(typeof(Product.Categories), category))
            {
                return NotFound();
            }

            var cat = category.ParseEnum<Product.Categories>();

            return new ObjectResult(_unitOfWork.Products.GetWithCategoryPaginated(cat, index, pagesize));
        }

        [HttpGet("latest/{size}")]
        public IActionResult GetLatest(int size)
        {
            var result = _unitOfWork.Products.GetLatest(size);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("filter/{name}/{sort}/{index}/{size}")]
        public IActionResult GetFiltered(string name, string sort, int index, int size = 10)
        {

            var result = _unitOfWork.Products.GetFiltered(name, sort, index, size);

            if (result == null) {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Product item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _unitOfWork.Products.Add(item);
            _unitOfWork.Complete();

            return CreatedAtRoute("GetProduct", new { id = item.Id }, item);
        }

        [HttpPost("{productId}/images/{imageId}")]
        public IActionResult AddImage(int productId, int imageId)
        {
            var product = _unitOfWork.Products.Get(productId);
            if (product == null)
            {
                return NotFound();
            }

            byte[] image = new byte[(int)Request.ContentLength];
            for (int i = 0; i < Request.ContentLength; i++)
            {
                image[i] = (byte)Request.Body.ReadByte();
            }

            switch (imageId)
            {
                case 1:
                    product.Image1 = image;
                    break;
                case 2:
                    product.Image2 = image;
                    break;
                case 3:
                    product.Image3 = image;
                    break;
                default:
                    return NotFound();
            }

            _unitOfWork.Complete();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Product item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var product = _unitOfWork.Products.Find(p => p.Id == id).FirstOrDefault();
            if (product == null)
            {
                return NotFound();
            }

            product.Name = item.Name;
            product.Description = item.Description; 
            product.Price = item.Price; 
            product.Stock = item.Stock; 
            _unitOfWork.Complete();

            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _unitOfWork.Products.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            _unitOfWork.Products.Remove(item);
            _unitOfWork.Complete();
            return new NoContentResult();
        }

        [HttpGet("search/{searchString}")]
        public IActionResult Search(string searchString) {

            var result = _unitOfWork.Products
                .Find(p =>
                p.Name.ToLower().Contains(searchString.ToLower()) || p.CategoryString.ToLower() == searchString.ToLower() )
                .ToList(); 

            return Ok(result);
        }

        [HttpGet("search/{searchString}/{index}/{size}")]
        public IActionResult PaginatedSearch(string searchString, int index, int size = 10){
            
            var result = _unitOfWork.Products
                .Find(p =>
                p.Name.ToLower().Contains(searchString.ToLower()) || p.CategoryString.ToLower() == searchString.ToLower() )
                .Skip((index - 1) * size)
                .Take(size)
                .ToList(); 
            
            return Ok(result); 
        }

        [HttpDelete("customization/{productId}/{customizationId}")]
        public IActionResult RemoveCustomizationFromProduct(int productId, int customizationId){
            var customization = _unitOfWork.Customizations.Get(customizationId); 
            var product = _unitOfWork.Products.Get(productId);

            var customProduct = _unitOfWork.Customizations.CheckIfInTable(productId, customizationId); 

            if(customization == null || product == null){
                return NotFound(); 
            }
            
            try{
                if(!_unitOfWork.Customizations.RemoveCustomization(productId, customizationId)){
                    return NotFound(); 
                }
            }
            catch(ArgumentException){
                
            }
            
            _unitOfWork.Complete(); 
            return Ok(); 
        }

        [HttpPost("customization/{productId}/{customizationId}")]
        public IActionResult AddCustomizationToProduct(int productId, int customizationId){
            var customization = _unitOfWork.Customizations.Get(customizationId);
            var product = _unitOfWork.Products.Get(productId); 
            
            if(customization == null || product == null){
                return NotFound(); 
            }
            
            var customProduct = new CustomizationProduct {
                Customization = customization,
                CustomizationId = customizationId,
                Product = product, 
                ProductId = productId
            }; 
             
            if(product.Customizations == null)
            {
                product.Customizations = new List<CustomizationProduct>();                 
            }   

            if(customization.Products == null){
                customization.Products = new List<CustomizationProduct>();
            }
            
            if(_unitOfWork.Customizations.CheckIfInTable(productId, customizationId).FirstOrDefault() == null)
            {
                customization.Products.Add(customProduct);
                product.Customizations.Add(customProduct);
            }
            
            _unitOfWork.Complete(); 
            
            return Ok(); 
        }

        [HttpGet("customizations/{productId}")]
        public IActionResult GetCustomizationsForProduct(int productId){
            var result = new List<object>(); 
            
            var customizationProducts = _unitOfWork.Customizations.GetWithCustomizations(productId); 
            
            if(customizationProducts == null)
            {
                return NotFound(); 
            }
            
            foreach (var productCustomization in customizationProducts)
            {
                result.Add(productCustomization); 
            }
            
            return Ok(result); 
        }

        [HttpPost("customization")]
        public IActionResult CreateCustomization([FromBody] Customization customization){
            
            if (customization == null)
            {
                return BadRequest();
            }

            _unitOfWork.Customizations.Add(customization);
            _unitOfWork.Complete();

            return Ok(); 
        }

        [HttpGet("customization/{index}/{size}")]
        public IActionResult PaginatedCustomizations(int index, int size = 10){
            var result = _unitOfWork.Customizations.GetAllPaginated(index, size);
            return new ObjectResult(result); 
        }

        [HttpGet("customizations")]
        public IActionResult Customizations(){
            var result = _unitOfWork.Customizations.GetAll();
            return Ok(result); 
        }

        [HttpPut("customization/{id}")]
        public IActionResult UpdateCustomization(int id, [FromBody] Customization item)
        {
            var customization = _unitOfWork.Customizations.Get(id);
            
            if(customization == null)
            {
                return NotFound(); 
            }
            
            customization.Description = item.Description; 
            customization.Name = item.Name; 
            customization.Price = item.Price; 
            
            _unitOfWork.Complete(); 
            
            return Ok(); 
        }

        [HttpPost("auction/add")]
        public IActionResult addAuction([FromBody] Auction auction) {
            var product = _unitOfWork.Products.Get(auction.ProductId);
            if(product == null) {
                return NotFound();
            }

            _unitOfWork.Auction.Add(auction);
            _unitOfWork.Complete();            

            return CreatedAtRoute("GetAuction", new { id = auction.AuctionId });
            
        }

        [HttpGet("auction/{id}", Name = "GetAuction")]
        public IActionResult getAuction(int id) {
            var auction = _unitOfWork.Auction.Get(id);
            if(auction == null) {
                return NotFound();
            }

            return new JsonResult(auction);

        }

        [HttpPost("auction/{id}/bid/add")]
        public IActionResult addBid(int id, [FromBody] Bid bid) {
            var auction = _unitOfWork.Auction.Get(id);

            if(auction == null) {
                return NotFound();
            }

            _unitOfWork.Bid.Add(bid);

            return new JsonResult("ok"); 
        }

        [HttpGet("customizations/amount")]
        public IActionResult CountCustomizations(){
            return Ok(_unitOfWork.Customizations.Amount()); 
        }

        [HttpGet("customization/{id}")]
        public IActionResult GetCustomization(int id){
            var result = _unitOfWork.Customizations.Get(id);
            
            if(result == null)
            { 
                return NotFound(); 
            }

            return Ok(result);
        }
    }
        
}