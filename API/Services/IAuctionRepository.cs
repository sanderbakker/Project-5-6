using API.Models;
using System.Collections.Generic;
using System.Linq;
using System;

namespace API.Services
{
    public interface IAuctionRepository : IRepository<Auction>
    {
        IQueryable GetWithBiddings(int auctionId);
    }
}