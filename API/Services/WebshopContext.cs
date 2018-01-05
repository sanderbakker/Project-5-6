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
        public DbSet<Auction> Auctions { get;set; }
        public DbSet<Bid> Bid { get;set; }
        public DbSet<CustomizationProduct> CustomizationProducts {get; set;}
        public DbSet<Customization> Customization {get;set;}

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

            modelBuilder.Entity<CustomizationProduct>()
                .HasKey(c => new {c.CustomizationId, c.ProductId}); 

            modelBuilder.Entity<CustomizationProduct>()
                .HasOne(c => c.Product)
                .WithMany(c => c.Customizations)
                .HasForeignKey(p => p.ProductId);
            
            modelBuilder.Entity<CustomizationProduct>()
                .HasOne(c => c.Customization)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CustomizationId); 
            
            modelBuilder.Entity<OrderProduct>()
                .HasOne(o => o.Product)
                .WithMany(o => o.Orders)
                .HasForeignKey(p => p.ProductId);
            
            modelBuilder.Entity<OrderProduct>()
                .HasOne(o => o.Order)
                .WithMany(o => o.Products)
                .HasForeignKey(p => p.OrderId);
        }
    }
}
