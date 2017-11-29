using API.Models;

namespace API.Services
{
    public interface IShoppingCartRepository : IRepository<ShoppingCart>
    {
        ShoppingCart GetWithProducts(int id);
    }
}
