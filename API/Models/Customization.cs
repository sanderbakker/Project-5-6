using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Customization
    {
        public int Id { get; set; }
        public List<CustomizationProduct> Products {get;set;}
        public string Name {get;set;}
        public float Price {get; set;}
        public string Description{get; set;}
        public DateTime AddedAt {get;set;} 
    }
}
