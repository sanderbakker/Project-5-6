using System.Collections.Generic; 
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Order
    {
        public int OrderId { get;set; }
        public string UserId { get; set; }
        public ApplicationUser User { get;set; }
        public List<OrderProduct> Products { get;set; }
        public float totalPrice { get;set; }

        [NotMapped]
        public ShippingProviders ShippingProvider { get; set; }

        [Column("ShippingProvider")]
        public string ShippingProviderString
        {
            get { return ShippingProvider.ToString(); }
            private set { ShippingProvider = value.ParseEnum<ShippingProviders>(); }
        }

        [NotMapped]
        public PaymentProviders PaymentProvider { get; set; }
        [Column("PaymentProvider")]
        public string PaymentProviderString
        {
            get { return PaymentProvider.ToString(); }
            private set { PaymentProvider = value.ParseEnum<PaymentProviders>(); }
        }         

        [NotMapped]
        public Statuses Status { get; set; }

        [Column("Status")]
        public string StatusString
        {
            get { return Status.ToString(); }
            private set { Status = value.ParseEnum<Statuses>(); }
        }
        
        public enum Statuses
        {
            Delivery,
            Processing, 
            Received
        }

        public enum ShippingProviders {
            UPS,
            PostNL            
        }

        public enum PaymentProviders {
            Bank,
            Creditcard, 
        }
    }
    

}