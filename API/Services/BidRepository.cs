using System.Collections.Generic;
using System.Linq;

using API.Models;
using System;

namespace API.Services
{
    public class BidRepository : Repository<Bid>, IBidRepository
    {
        public BidRepository(WebshopContext context)
            : base(context)
        {

        }

        public WebshopContext WebshopContext
        {
            get { return _context as WebshopContext; }
        }    

        public IQueryable withUserDetails(int auctionId) {
            return (from b in WebshopContext.Bid 
                    join a in WebshopContext.Auctions on b.AuctionId equals a.AuctionId
                    join u in WebshopContext.Users on b.UserId equals u.Id 
                    where b.AuctionId == auctionId
                    orderby b.Price ascending
                    select new {BidId = b.BidId, Price = b.Price, CloseOn = a.CloseOn, Time = b.Time, FirstName = u.FirstName, LastName = u.LastName, Admin = u.IsAdmin}
            );
        }        
    }
}