using System.Collections.Generic;

using API.Models;

namespace API.Services
{
    public interface IProductRepository : IRepository<Product>
    {
        IEnumerable<Product> GetAllPaginated(int pageIndex, int pageSize);
        IEnumerable<Product> GetWithCategory(Product.Categories category);
        IEnumerable<Product> GetWithCategoryPaginated(Product.Categories category, int pageIndex, int pageSize = 10);
        IEnumerable<string> GetCategories();
        int GetAmount();
    }
}
