using System.Collections.Generic; 
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Auction
    {
        public int AuctionId { get;set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public float startingPrice { get;set; }
        public List<Bid> Biddings { get;set; }
       
    }
}