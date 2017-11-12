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

        public IEnumerable<Product> GetLatest(int size){
            return WebshopContext.Products
                .OrderByDescending(p => p.AddedAt)
                .Take(size)
                .ToList(); 
        }

        public IEnumerable<Product> GetWithCategory(Product.Categories category)
        {
            return WebshopContext.Products
                .Where(x => x.Category == category);
        }

        public IEnumerable<Product> GetFiltered(string name, string sort, int index, int size)
        {
                            
            switch(sort){
                case "asc":
                    switch(name){
                        case "name":
                            return WebshopContext.Products
                                .OrderBy(p => p.Name)
                                .Skip((index- 1) * size)
                                .Take(size) 
                                .ToList(); 
                        case "price":
                            return WebshopContext.Products
                                .OrderBy(p => p.Price)
                                .Skip((index- 1) * size)
                                .Take(size)
                                .ToList(); 
                        case "addedAt":
                            return WebshopContext.Products
                                .OrderBy(p => p.AddedAt)
                                .Skip((index- 1) * size)
                                .Take(size)
                                .ToList();
                    }
                    break; 
                case "desc":
                    switch(name){
                        case "name":
                            return WebshopContext.Products
                                .OrderByDescending(p => p.Name)
                                .Skip((index- 1) * size)
                                .Take(size)
                                .ToList(); 
                        case "price":
                            return WebshopContext.Products
                                .OrderByDescending(p => p.Price)
                                .Skip((index- 1) * size)
                                .Take(size)
                                .ToList();
                        case "addedAt":
                            return WebshopContext.Products
                                .OrderBy(p => p.AddedAt)
                                .Skip((index- 1) * size)
                                .Take(size)
                                .ToList();
                    }   
                    break; 
                default: 
                    return null; 
            }
            return null; 
        }

        public IEnumerable<Product> GetWithCategoryPaginated(Product.Categories category, int pageIndex, int pageSize = 10)
        {
            return WebshopContext.Products
                .Where(x => x.Category == category)
                .OrderBy(p => p.Name)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public IEnumerable<string> GetCategories()
        {
            return Enum.GetNames(typeof(Product.Categories)).ToList();
        }

        public int GetAmount()
        {
            return WebshopContext.Products.Count();
        }

        public WebshopContext WebshopContext
        {
            get { return _context as WebshopContext; }
        }
    }
}
