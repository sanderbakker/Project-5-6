using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using API.Models;

namespace API.Services
{
    public class WebshopContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ShoppingCart> Carts { get; set; }
        
        public WebshopContext(DbContextOptions<WebshopContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {          
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ShoppingCartProduct>()
                .HasKey(s => new { s.ShoppingCartId, s.ProductId });
        }
    }
}
