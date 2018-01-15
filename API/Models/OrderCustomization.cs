namespace API.Models {
    public class OrderCustomization
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int ProductId { get; set; }
        public Product Product {get;set;}
        public int CustomizationId {get;set;}
        public Customization Customization {get;set;}

    }
}