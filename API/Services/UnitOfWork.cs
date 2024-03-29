﻿using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WebshopContext _context;

        public IProductRepository Products { get; private set; }
        public IShoppingCartRepository ShoppingCarts { get; set; }
        public IOrderRepository Orders { get; set; }
        public IBidRepository Bid { get;set; }
        public IAuctionRepository Auction { get;set; }
        public ICustomizationRepository Customizations {get; set; }
        public UserRepository Users { get; private set; }

        public UnitOfWork(
            WebshopContext context, 
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<JWTSettings> optionsAccessor)
        {
            _context = context;

            Products = new ProductRepository(_context);
            ShoppingCarts = new ShoppingCartRepository(_context);
            Orders = new OrderRepository(_context);
            Users = new UserRepository(userManager, signInManager, optionsAccessor, _context);
            Customizations = new CustomizationRespository(_context); 
            Auction = new AuctionRepository(_context);
            Bid = new BidRepository(_context);
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
