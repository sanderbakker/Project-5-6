namespace API.Models {
    public class OrderProduct{
        public Product Product {get;set;}
        public Order Order {get; set;}
        public int OrderId {get;set;}
        public int ProductId{get;set;}
    }
}