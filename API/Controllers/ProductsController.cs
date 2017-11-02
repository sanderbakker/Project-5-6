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

            if (_unitOfWork.Products.GetAll().Count() == 0)
            {
                _unitOfWork.Products.Add(new Product { Id = 1, Name = "Banaan", Category = Product.Categories.Other });
                _unitOfWork.Complete();
            }
        }

        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            return _unitOfWork.Products.GetAll();
        }

        [HttpGet("{id}", Name = "GetProduct" )]
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
            _unitOfWork.Complete();

            return new NoContentResult();
        }

        [HttpDelete]
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
    }
}