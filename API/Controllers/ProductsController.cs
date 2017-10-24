using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using API.Services;
using API.Models;

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
                _unitOfWork.Products.Add(new Product { Id = 1, Name = "Banaan" });
                _unitOfWork.Complete();
            }
        }

        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            return _unitOfWork.Products.GetAll();
        }
    }
}