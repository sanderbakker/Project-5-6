using System.Collections.Generic;

namespace API.Models
{
    public class ShoppingCartCustomizations
    {
        public int ShoppingCartId {get;set;}
        public ShoppingCart ShoppingCart {get;set;}
        public int ProductId {get;set;}
        public Product Product {get;set;}
        public int CustomizationId {get;set;}
        public Customization Customization {get; set;}
    }
}
