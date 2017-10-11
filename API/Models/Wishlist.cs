using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class Wishlist
    {
        public ApplicationUser User { get; set; }
        public int UserId { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }

    }
}
