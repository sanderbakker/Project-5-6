using System.Collections.Generic;

namespace API.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ApplicationUser User { get; set; }
        public List<ShoppingCartProduct> Products { get; set; }

        public ShoppingCart()
        {
            Products = new List<ShoppingCartProduct>();
        }
    }
}
