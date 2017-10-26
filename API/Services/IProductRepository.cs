using System.Collections.Generic;

using API.Models;

namespace API.Services
{
    public interface IProductRepository : IRepository<Product>
    {
        IEnumerable<Product> GetAllPaginated(int pageIndex, int pageSize);
        IEnumerable<string> GetCategories();
    }
}
