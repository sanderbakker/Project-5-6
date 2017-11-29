using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace API.Services
{
    public class ShoppingCartRepository : Repository<ShoppingCart>, IShoppingCartRepository
    {
        public ShoppingCartRepository(WebshopContext context)
            : base(context)
        {

        }

        public ShoppingCart GetWithProducts(int id)
        {
            return WebshopContext.Cart.Where(c => c.Id == id).Include(c => c.Products).FirstOrDefault();
                   
        }

        public WebshopContext WebshopContext
        {
            get { return _context as WebshopContext; }
        }
    }
}
