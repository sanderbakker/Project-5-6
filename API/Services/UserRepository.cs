using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System;
using System.Linq;

using API.Models;
using System.Security.Claims;

namespace API.Services
{
    public class UserRepository
    {
        private UserManager<ApplicationUser> _userManager { get; set; }
        private SignInManager<ApplicationUser> _signInManager { get; set; }
        private readonly JWTSettings _options;

        public UserRepository(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<JWTSettings> optionsAccessor,
            WebshopContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _options = optionsAccessor.Value;
        }

        public async Task<IdentityResult> MakeAdmin(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return await _userManager.AddToRoleAsync(user, "Administrator");
        }
        
        public async Task<IActionResult> Register(Credentials Credentials)
        {
            var user = new ApplicationUser { UserName = Credentials.Email, Email = Credentials.Email };
            var result = await _userManager.CreateAsync(user, Credentials.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return new JsonResult(new Dictionary<string, object>
                    {
                        // setup token for newly registered user
                        { "access_token", GetAccessToken(Credentials.Email) },
                        { "id_token", GetIdToken(user) }
                    });
            }
            return Errors(result);
        }

        public async Task<IActionResult> SignIn(Credentials Credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(Credentials.Email, Credentials.Password, false, false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(Credentials.Email);
                if (user.IsDisabled)
                {
                    return new JsonResult("Unable to sign in") { StatusCode = 401 };
                }
                return new JsonResult(new Dictionary<string, object>
                    {
                        // setup token for signed in user
                        { "access_token", GetAccessToken(Credentials.Email) },
                        { "id_token", GetIdToken(user) }
                    });
            }
            return new JsonResult("Unable to sign in") { StatusCode = 401 };
        }

        public string GetIdToken(IdentityUser user)
        {
            var appUser = _userManager.FindByIdAsync(user.Id).Result;
            var payload = new Dictionary<string, object>
            {
                { "id", user.Id },
                { "sub", user.Email },
                { "email", user.Email },
                { "emailConfirmed", user.EmailConfirmed },
                { "roles", _userManager.GetRolesAsync(appUser).Result }
            };

            return GetToken(payload);
        }

        public string GetAccessToken(string Email)
        {
            var payload = new Dictionary<string, object>
            {
                { "sub", Email },
                { "email", Email }
            };

            return GetToken(payload);
        }

        public string GetToken(Dictionary<string, object> payload)
        {
            // setup the token with proper secret
            var secret = _options.SecretKey;

            // grab all the necessary data for the token
            payload.Add("iss", _options.Issuer);
            payload.Add("aud", _options.Audience);
            payload.Add("nbf", ConvertToUnixTimestamp(DateTime.Now));
            payload.Add("iat", ConvertToUnixTimestamp(DateTime.Now));
            payload.Add("exp", ConvertToUnixTimestamp(DateTime.Now.AddDays(7)));

            // set the proper encryption
            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();

            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            return encoder.Encode(payload, secret);
        }

        public JsonResult Errors(IdentityResult result)
        {
            var items = result.Errors
                .Select(x => x.Description)
                .ToArray();

            return new JsonResult(items) { StatusCode = 400 };
        }

        public JsonResult Error(string message)
        {
            return new JsonResult(message) { StatusCode = 400 };
        }

        public static double ConvertToUnixTimestamp(DateTime date)
        {
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            TimeSpan diff = date.ToUniversalTime() - origin;

            return Math.Floor(diff.TotalSeconds);
        }

        public async Task<ApplicationUser> Get(string id)
        {
            // include lists in ApplicationUser to eagerly load them
            return await _userManager.Users
                .Include(u => u.Addresses)
                .Include(u => u.ShoppingCart)
                    .ThenInclude(s => s.Products)
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync();
        }

        public IEnumerable<ApplicationUser> GetAll()
        {
            return _userManager.Users.ToList();
        }

        public IEnumerable<ApplicationUser> GetAllPaginated(int pageIndex, int pageSize = 10)
        {
            return _userManager.Users
                .OrderBy(p => p.UserName)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public int GetAmount()
        {
            return _userManager.Users.Count();
        }
    }
}
