using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Order
    {
        public ApplicationUser User { get; set; }
        public UserAddress UserAddress { get; set; }
        public int UserId { get; set; }
        public int UserAddressId { get; set; }
        public int Id { get; set; }
        public List<OrderStatus> OrderStatus { get; set; } 

    }
}
