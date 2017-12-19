using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description {get; set; }
        public float Price {get; set; }
        public byte[] Image1 { get; set; }
        public byte[] Image2 { get; set; }
        public byte[] Image3 { get; set; }
        public DateTime AddedAt { get; set; }
        public List<OrderProduct> Orders {get;set;}
        public List<ShoppingCartProduct> ShoppingCarts { get; set; }
        public List<Customization> Customizations {get; set;}
        public int Stock {get; set;}
        public bool Auction { get; set; } 
        
        [NotMapped]
        public Categories Category { get; set; }

        [Column("Category")]
        public string CategoryString
        {
            get { return Category.ToString(); }
            private set { Category = value.ParseEnum<Categories>(); }
        }
        
        public enum Categories
        {
            House,
            Island,
            Plane,
            Ship,
            Car,
            Jewelry,
            Other
        }
    }

    public static class StringExtensions
    {
        public static T ParseEnum<T>(this string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }
    }
}
