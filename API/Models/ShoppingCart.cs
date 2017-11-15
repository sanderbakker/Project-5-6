using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace API.Models {
    public class ShoppingCart {
        public int Id {get; set;}
        public List<Product> Products { get; set; }
        public List<ShoppingCartProduct> ShoppingCartProducts { get; set; }
    }
}