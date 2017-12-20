using API.Models;

using System;
using System.Collections.Generic;
using System.Linq; 

namespace API.Services
{
    public interface ICustomizationRepository : IRepository<Customization>
    {
        IQueryable GetWithCustomizations(int productId);    
    }
}
