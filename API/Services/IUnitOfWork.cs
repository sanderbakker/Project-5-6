using System;

namespace API.Services
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository Products { get; }
        UserRepository Users { get; }
        int Complete();
    }
}
