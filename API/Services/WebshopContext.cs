using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using API.Models;

namespace API.Services
{
    public class WebshopContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ShoppingCart> Carts { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set;}

        public WebshopContext(DbContextOptions<WebshopContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {          
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ShoppingCartProduct>()
                .HasKey(s => new { s.ShoppingCartId, s.ProductId });

            modelBuilder.Entity<OrderProduct>()
                .HasKey(o => new { o.OrderId, o.ProductId});
            
            modelBuilder.Entity<OrderProduct>()
                .HasOne(o => o.Product)
                .WithMany(o => o.Orders)
                .HasForeignKey(p => p.ProductId);
            
            modelBuilder.Entity<OrderProduct>()
                .HasOne(o => o.Order)
                .WithMany(o => o.Products)
                .HasForeignKey(p => p.OrderId);

            modelBuilder.Entity<Product>().Property(p => p.Image1).HasColumnType("image");
            modelBuilder.Entity<Product>().Property(p => p.Image2).HasColumnType("image");
            modelBuilder.Entity<Product>().Property(p => p.Image3).HasColumnType("image");
        }
    }
}
