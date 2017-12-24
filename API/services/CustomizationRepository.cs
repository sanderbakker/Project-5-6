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

        public IEnumerable<Customization> GetAllPaginated(int index, int size){
            return WebshopContext.Customization
                .OrderBy(c => c.Name)
                .Skip((index - 1) * size)
                .Take(size)
                .ToList();
        }
        public int Amount(){
            return WebshopContext.Customization.Count(); 
        }

        public IEnumerable<CustomizationProduct> CheckIfInTable(int productId, int customizationId){
            var result = (from cP in WebshopContext.CustomizationProducts 
                          where cP.ProductId == productId && cP.CustomizationId == customizationId
                          select cP);
            return result;  
            
        }

        public bool RemoveCustomization(int productId, int customizationId){
            var result = (from cP in WebshopContext.CustomizationProducts
                          where cP.ProductId == productId && cP.CustomizationId == customizationId
                          select cP);
            
            WebshopContext.CustomizationProducts.Remove(result.FirstOrDefault()); 
            
            try {
                WebshopContext.SaveChanges();
                return true; 
            }
            catch(Exception){
                return false; 
            }
        }
    }
}
