using Microsoft.EntityFrameworkCore;

using API.Models;

namespace API.Services
{
    public class WebshopContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public WebshopContext(DbContextOptions<WebshopContext> options)
            : base(options)
        {

        }
    }
}
