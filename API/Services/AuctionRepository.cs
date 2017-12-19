using System.Collections.Generic;
using System.Linq;

using API.Models;
using System;


namespace API.Services
{
    public class AuctionRepository : Repository<Auction>, IAuctionRepository
    {
        public AuctionRepository(WebshopContext context)
            : base(context)
        {

        }
    }
}