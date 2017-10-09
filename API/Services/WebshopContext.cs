﻿using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using API.Models;

namespace API.Services
{
    public class WebshopContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        //public DbSet<Wishlist> Wishlists { get; set; }
        //public DbSet<UserAddress> Addresses { get; set; }
        //public DbSet<Country> Countries { get; set; }
        //public DbSet<Order> Orders { get; set; }
        //public DbSet<StatusOfOrder> StatusOfOrder { get; set; }
        //public DbSet<Ticket> Tickets { get; set; }
        

        public WebshopContext(DbContextOptions<WebshopContext> options)
            : base(options)
        {

        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //    modelBuilder.Entity<User>()
        //        .HasMany(u => u.Whislists)
        //        .WithOne(w => w.User)
        //        .HasForeignKey(w => w.UserId);

        //    modelBuilder.Entity<User>()
        //        .HasMany(u => u.Address)
        //        .WithOne(ua => ua.User)
        //        .HasForeignKey(ua => ua.UserId);

        //    modelBuilder.Entity<UserAddress>()
        //         .HasOne(ua => ua.Country)
        //         .WithOne(c => c.Address)
        //         .HasForeignKey<UserAddress>(ua => ua.CountryId);

        //    modelBuilder.Entity<User>()
        //        .HasMany(u => u.Orders)
        //        .WithOne(o => o.User)
        //        .HasForeignKey(o => o.UserId);

        //    modelBuilder.Entity<UserAddress>()
        //        .HasMany(ua => ua.Orders)
        //        .WithOne(o => o.UserAddress)
        //        .HasForeignKey(o => o.UserAddressId);

        //    modelBuilder.Entity<Order>()
        //        .HasMany(o => o.OrderStatus)
        //        .WithOne(os => os.Order)
        //        .HasForeignKey(os => os.OrderId);

        //    modelBuilder.Entity<User>()
        //        .HasMany(u => u.Tickets)
        //        .WithOne(t => t.User)
        //        .HasForeignKey(t => t.UserId);

        //    modelBuilder.Entity<User>()
        //        .HasMany(u => u.Tickets)
        //        .WithOne(t => t.Admin)
        //        .HasForeignKey(t => t.AdminId);

        //    modelBuilder.Entity<User>()
        //        .HasMany(u => u.Tickets)
        //        .WithOne(t => t.Customer)
        //        .HasForeignKey(t => t.CustomerId);

        //}
    }
}
