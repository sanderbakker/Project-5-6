using API.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

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

        public IEnumerable<string> GetStatuses() {
            return Enum.GetNames(typeof(Order.Statuses)).ToList();
        }

        public IQueryable GetWithProducts(int orderId)
        {
            return (from orderProducts in WebshopContext.OrderProducts
                    join product in WebshopContext.Products on orderProducts.ProductId equals product.Id
                    where orderProducts.OrderId == orderId
                    select new { id = product.Id, name = product.Name, price = product.Price, quantity = orderProducts.Quantity });
        }
        public IQueryable GetWithCustomizations (int orderId)
        {
            return (from OrderCustomization in WebshopContext.OrderCustomizations
                    join customization in WebshopContext.Customization on OrderCustomization.CustomizationId equals customization.Id
                    where OrderCustomization.OrderId == orderId
                    select new { id = customization.Id, name = customization.Name, price = customization.Price});
        
        }
    }
}
