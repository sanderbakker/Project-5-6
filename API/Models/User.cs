using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool Is_Verified { get; set; }
        public bool Is_Seller { get; set; }
        public bool Is_Disabled { get; set; }
        public bool Is_Support { get; set; }
        public bool Is_Admin { get; set; }
    }
}
