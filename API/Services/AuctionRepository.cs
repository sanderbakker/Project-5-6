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

        public WebshopContext WebshopContext
        {
            get { return _context as WebshopContext; }
        }        
        public IQueryable GetWithBiddings(int auctionId) {
            // return(from a in WebshopContext.Auctions
            //         join b in WebshopContext.Bid on a.AuctionId equals b.AuctionId 
            //         where a.AuctionId == auctionId
            //         select new { auctionId = a.AuctionId, producta.ProductId}
            // )
            return null;
        }        
    }
}