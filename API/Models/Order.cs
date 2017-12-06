using System.Collections.Generic; 
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Order
    {
        public int OrderId { get;set; }
        public string UserId { get; set; }
        public ApplicationUser User { get;set; }
        public List<OrderProduct> Products { get;set; }

        [NotMapped]
        public Statuses Status { get; set; }

        [Column("Status")]
        public string StatusString
        {
            get { return Status.ToString(); }
            private set { Status = value.ParseEnum<Statuses>(); }
        }
        
        public enum Statuses
        {
            Delivery,
            Processing, 
            Received
        }
    }
    

}