using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using API.Models;

namespace API.Services
{
    public class WebshopContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product> Products { get; set; }
        
        public WebshopContext(DbContextOptions<WebshopContext> options)
            : base(options)
        {

        }
    }
}
