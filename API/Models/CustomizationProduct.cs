using System;
using System.Collections.Generic;

namespace API.Models
{
    public class CustomizationProduct {
        public int Id {get;set;}
        public Product Product {get;set;}
        public int ProductId {get;set;}
        public  Customization Customization {get;set;}
        public int CustomizationId {get;set;}
        
    }
}