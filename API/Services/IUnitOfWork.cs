using System;

namespace API.Services
{
    interface IUnitOfWork : IDisposable
    {
        IProductRepository Products { get; }
        int Complete();
    }
}
