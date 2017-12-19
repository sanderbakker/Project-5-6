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
    }
}