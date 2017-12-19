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
        public IActionResult AddImage(int productId, int imageId, [FromBody] byte[] image)
        {
            var product = _unitOfWork.Products.Get(productId);
            if (product == null)
            {
                return NotFound();
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

        [HttpGet("customization/{index}/{size}")]
        public IActionResult PaginatedCustomizations(int index, int size = 10){
            var result = _unitOfWork.Customizations.GetAllPaginated(index, size);
            if(result == null){
                return NotFound(); 
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
    }
        
}