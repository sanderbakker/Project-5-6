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

        public DateTime AddedAt { get; set; }

        [Column("Category")]
        public string CategoryString
        {
            get { return Category.ToString(); }
            private set { Category = value.ParseEnum<Categories>(); }
        }

        [NotMapped]
        public Categories Category { get; set; }
        
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

        public List<ShoppingCartProduct> ShoppingCartProducts { get; set; }
    }

    public static class StringExtensions
    {
        public static T ParseEnum<T>(this string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }
    }
}
