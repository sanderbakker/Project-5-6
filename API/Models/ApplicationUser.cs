using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<UserAddress> Addresses { get; set; }
        public List<Order> Orders { get; set; }
        public ShoppingCart ShoppingCart { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsAdmin { get; set; }

        public ApplicationUser()
        {
            ShoppingCart = new ShoppingCart();
        }
    }
}
