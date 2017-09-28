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
        public StatusOfOrder Status { get; set; }
        
    }
}
