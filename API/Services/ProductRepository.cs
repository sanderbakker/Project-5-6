using System.Collections.Generic;
using System.Linq;

using API.Models;
using System;

namespace API.Services
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(WebshopContext context)
            : base(context)
        {

        }

        public IEnumerable<Product> GetAllPaginated(int pageIndex, int pageSize = 10)
        {
            return WebshopContext.Products
                .OrderBy(p => p.Name)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public IEnumerable<Product> GetWithCategory(Product.Categories category)
        {
            return WebshopContext.Products
                .Where(x => x.Category == category);
        }

        public IEnumerable<string> GetCategories()
        {
            return Enum.GetNames(typeof(Product.Categories)).ToList();
        }

        public WebshopContext WebshopContext
        {
            get { return _context as WebshopContext; }
        }
    }
}
