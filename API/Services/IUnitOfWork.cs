﻿using System;

namespace API.Services
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository Products { get; }
        IShoppingCartRepository ShoppingCarts { get; }
        IOrderRepository Orders { get; }
        UserRepository Users { get; }

        ICustomizationRepository Customizations {get; }
        int Complete();
    }
}
