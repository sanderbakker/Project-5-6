using API.Models;

namespace API.Services
{
    public class ShoppingCartRepository : Repository<ShoppingCart>, IShoppingCartRepository
    {
        public ShoppingCartRepository(WebshopContext context)
            : base(context)
        {

        }
    }
}
