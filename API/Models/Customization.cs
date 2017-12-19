using System;

namespace API.Models
{
    public class Customization
    {
        public int Id { get; set; }
        public Product Product {get;set;}
        public int ProductId {get;set;}
        public string Name {get;set;}
        public float Price {get; set;}
        public string Description{get; set;}
        public DateTime AddedAt {get;set;} 
    }
}
