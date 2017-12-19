using API.Models;

using System;
using System.Collections.Generic;

namespace API.Services
{
    public interface ICustomizationRepository : IRepository<Customization>
    {
        IEnumerable<Customization> GetAllPaginated(int pageIndex, int pageSize); 
    }
}
