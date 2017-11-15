using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public List<UserAddress> Addresses { get; set; }
        public List<ShoppingCart> ShoppingCarts { get; set; }
    }
}
