using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WebshopContext _context;

        public IProductRepository Products { get; private set; }
        public UserRepository Users { get; private set; }

        public UnitOfWork(
            WebshopContext context, 
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<JWTSettings> optionsAccessor)
        {
            _context = context;

            Products = new ProductRepository(_context);
            Users = new UserRepository(userManager, signInManager, optionsAccessor, _context);
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
