using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace API.Models
{
    public class UserAddress
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string zipCode { get; set; }
        public Country Country { get; set; }
        public int CountryId { get; set; }
        public List<Order> Orders { get; set; }
    }
}
