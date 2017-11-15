using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace API.Models 
{
    public class ShoppingCartProduct 
    {
        public int ShoppingCartId { get; set; }
        public ShoppingCart ShoppingCart { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}