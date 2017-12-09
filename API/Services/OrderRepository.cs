using API.Models;
using System.Collections.Generic;
using System.Linq;
using System;

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

        public IEnumerable<string> GetPaymentProviders()
        {
            return Enum.GetNames(typeof(Order.PaymentProviders)).ToList();
        }

        public IEnumerable<string> GetShipmentProviders() {
            return Enum.GetNames(typeof(Order.ShippingProviders)).ToList();
        }        
    }
}
