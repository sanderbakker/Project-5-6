using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class TicketStatus
    {
        public int Id { get; set; }
        public Ticket Ticket { get; set; }
        public int TicketId { get; set; }
        public DateTime date { get; set; }
    }
}
