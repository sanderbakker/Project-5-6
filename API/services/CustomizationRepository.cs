using System.Collections.Generic;
using System.Linq;

using API.Models;
using System;

namespace API.Services
{
    public class CustomizationRespository : Repository<Customization>, ICustomizationRepository
    {
        public CustomizationRespository(WebshopContext context)
            : base(context)
        {

        }
        public WebshopContext WebshopContext
        {
            get { return _context as WebshopContext; }
        }

        public IQueryable GetWithCustomizations(int productId)
        {
            return (from cP in WebshopContext.CustomizationProducts
                    join c in WebshopContext.Customization on cP.CustomizationId equals c.Id
                    where cP.ProductId == productId
                    select new { id = c.Id, name = c.Name, price = c.Price, description = c.Description});
        }
    }
}
