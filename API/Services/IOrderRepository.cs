﻿using API.Models;
using System.Collections.Generic;
using System.Linq;
using System;

namespace API.Services
{
    public interface IOrderRepository : IRepository<Order>
    {
        IEnumerable<string> GetPaymentProviders();  
        IEnumerable<string> GetShipmentProviders();
        IEnumerable<string> GetStatuses();
        IQueryable GetWithProducts(int orderId);
        IQueryable GetWithCustomizations(int orderId);

    }
}
