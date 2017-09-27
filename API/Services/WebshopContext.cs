using Microsoft.EntityFrameworkCore;

using API.Models;

namespace API.Services
{
    public class WebshopContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }

        public WebshopContext(DbContextOptions<WebshopContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Whislists)
                .WithOne(w => w.User)
                .HasForeignKey(w => w.UserId); 
        }
    }
}
