namespace API.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WebshopContext _context;

        public IProductRepository Products { get; private set; }

        public UnitOfWork(WebshopContext context)
        {
            _context = context;
            Products = new ProductRepository(_context);
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
