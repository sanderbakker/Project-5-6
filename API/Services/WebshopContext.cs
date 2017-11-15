using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using API.Models;

namespace API.Services
{
    public class WebshopContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product> Products { get; set; }

        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<ShoppingCartProduct> ShoppingCartProducts { get; set; }
        
        public WebshopContext(DbContextOptions<WebshopContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TUserRole>()
                .HasKey(r => new {r.UserId, r.RoleId})
                .ToTable("AspNetUserRoles");

            modelBuilder.Entity<TUserLogin>()
                .HasKey(l => new {l.LoginProvider, l.ProviderKey, l.UserId})
                .ToTable("AspNetUserLogins");            

            modelBuilder.Entity<ShoppingCartProduct>()
                .HasKey(sp => new { sp.ShoppingCartId, sp.ProductId });

            modelBuilder.Entity<ShoppingCartProduct>()
                .HasOne(p => p.Product)
                .WithMany(r => r.ShoppingCartProducts)
                .HasForeignKey(p => p.ProductId);

            modelBuilder.Entity<ShoppingCartProduct>()
                .HasOne(s => s.ShoppingCart)
                .WithMany(r => r.ShoppingCartProducts)
                .HasForeignKey(s => s.ShoppingCartId);

        }
    }
}
