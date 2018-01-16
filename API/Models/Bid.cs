using System;
using System.Collections.Generic; 
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Bid
    {
        public int BidId { get; set; }
        public int AuctionId { get;set; }
        public float Price { get; set; }
        public DateTime Time { get; set; }
        public string UserId { get; set; }

    }
}