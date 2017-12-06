using API.Models;

namespace API.Services
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(WebshopContext context)
            : base(context)
        {

        }

        public WebshopContext WebshopContext
        {
            get { return _context as WebshopContext; }
        }
    }
}
