using System.Collections.Generic;

namespace API.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public List<ShoppingCartProduct> Products { get; set; }
    }
}
