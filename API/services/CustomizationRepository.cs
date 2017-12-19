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
        public IEnumerable<Customization> GetAllPaginated(int pageIndex, int pageSize){
            return WebshopContext.Customizations
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList(); 
        }
        public WebshopContext WebshopContext
        {
            get { return _context as WebshopContext; }
        }
    }
}
