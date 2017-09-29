using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Ticket
    {
        public User Admin { get; set; }
        public int AdminId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string TicketTitle { get; set; }
        public int Id { get; set; }
        public User Customer { get; set; }
        public int CustomerId { get; set; }
        public List<TicketStatus> TicketStatus { get; set;}
        public List<TicketMessage> TicketMessage { get; set; }

    }
}
