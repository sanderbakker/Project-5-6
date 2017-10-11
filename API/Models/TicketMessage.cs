using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class TicketMessage
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }
        public Ticket Ticket { get; set; }
        public int TicketId { get; set; }
    }
}
