
import {API} from '../API/API.js';
import jwt_decode from 'jwt-decode'; 


export class Products extends API {

	getProducts() {
		return this.get('/products')
	}
	getCategories(){
		return this.get('/products/categories'); 
	}

	getCategory(_category) {
		return this.get('/products/category/' + _category);
	}

	getProductsInCategory(_category){
		return this.get('/products/withcategory/' + _category); 
	}
	getProduct(_id){
		return this.get('/products/' + _id); 
	}

	getProductsAmount(){
		return this.get('/products/amount'); 
	}
	getProductsPaginated(_page_number){
		return this.get('/products/paginated/' + _page_number + '/9')
	}
	addProduct(_price, _description, _category, _name, _stock, _biddable){
		return this.post('/products', 
						{
							"name": _name,
							"price": _price,
							"description": _description,
							"category": _category,
							"stock": _stock, 
							"addedAt": new Date(),
							"auction": _biddable
						}
					)
	}
	addAuction(_productId, _startingPrice) {
		return this.post('/products/auction/add', 
			{
				"ProductId": _productId, 
			}
		)
	}

	getAuction(_productId) {
		return this.get('/products/auction/' + _productId);
	}

	getProductsByCategoryPaginated(_category, _page_number){
		return this.get("/products/withcategorypaginated/" + _category + "/" + _page_number + "/9")
	}

	addBid(_auctionId, _price) {
		return this.post("/products/auction/" + _auctionId + "/bid/add", {
			"AuctionId": _auctionId,
			"Price": _price,
			"UserId": jwt_decode(sessionStorage.getItem('id_token'))['id']
		});
	}

	updateProduct(_id, _description, _price, _category, _name, _stock, _biddable){
		return this.put("/products/" + _id, {
			"description": _description,
			"price": _price,
			"name": _name,
			"category": _category,
			"stock": _stock, 
			"id": _id,
			"auction": _biddable			
		})
	}

	deleteProduct(_id){
		return this.delete('/products/' + _id); 
	}
	getFilteredProducts(_name, _sort, _index){
		return this.get('/products/filter/' + _name + '/' + _sort + '/' + _index + '/9'); 
	}

	searchProducts(_search_string) {
		return this.get('/products/search/' + _search_string);
	} 
	searchProductsPaginated(_search_string, _page){
		return this.get('/products/search/' + _search_string + '/' + _page + '/9'); 
	}

	addImage(_id, _image, _number) {
		var data = new FormData();
		data.append("data", _image);
		
		var url = this.getApiUrl();
		return fetch(url + "/products/" + _id + "/images/" + (_number + 1), {
  			mode: "no-cors",			
		      method: "POST",
		      headers: {
		        "Accept": "application/json",
		      },
		      body: _image
		}).then(function(res) {
			return
		});
	}	
	getCustomizations(_page) {
		return this.get('/products/customization/' + _page + '/9'); 
	}

	getAllCustomizations(){
		return this.get("/products/customizations");
	}

	getAmountCustomizations(){
		return this.get('/products/customizations/amount'); 
	}

	addCustomization(_price, _description, _name){
		return this.post('/products/customization', 
			{
				"name": _name,
				"price": _price,
				"description": _description,
				"addedAt": new Date()
			}
		)
	}
	getCustomization(_id){
		return this.get('/products/customization/' + _id);
	}

	updateCustomization(_id, _name, _price, _description){
		return this.put('/products/customization/' + _id, 
			{
				"name": _name,
				"price": _price,
				"description": _description,
				"id": _id
			}
		)
	}

	addCustomizationToProduct(_customizationId, _productId){
		return this.post("/products/customization/" + _productId + "/" + _customizationId); 
	}

	getCustomizationForProduct(_productId){
		return this.get("/products/customizations/" + _productId); 
	}

	getProductWithCustomizations(_productId){
		return this.get("/products/withcustomizations/" + _productId); 
	}
	deleteCustomization(_productId, _customizationId)
	{
		return this.delete("/products/customization/" + _productId + "/" + _customizationId); 
	}
}
