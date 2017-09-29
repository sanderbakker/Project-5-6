using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class OrderStatus
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int StatusId { get; set;  }
        public Order Order { get; set; }
        public int OrderId { get; set; }
        
    }
}
