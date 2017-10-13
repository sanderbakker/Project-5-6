using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsVerified { get; set; }
        public bool IsSeller { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsSupport { get; set; }
        public bool IsAdmin { get; set; }
        public List<Wishlist> Whislists { get; set; }
        public List<UserAddress> Address { get; set; }
        public List<Order> Orders { get; set; }
        public List<Ticket> Tickets { get; set; }
    }
}
