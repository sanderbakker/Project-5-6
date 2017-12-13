
import {API} from '../API/API.js';

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
	addProduct(_price, _description, _category, _name, _stock){
		return this.post('/products', 
						{
							"name": _name,
							"price": _price,
							"description": _description,
							"category": _category,
							"stock": _stock, 
							"addedAt": new Date()
						}
					)
	}
	getProductsByCategoryPaginated(_category, _page_number){
		return this.get("/products/withcategorypaginated/" + _category + "/" + _page_number + "/9")
	}

	updateProduct(_id, _description, _price, _category, _name, _stock){
		return this.put("/products/" + _id, {
			"description": _description,
			"price": _price,
			"name": _name,
			"category": _category,
			"stock": _stock, 
			"id": _id
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

	addImage(_id, _image) {
		var data = new FormData();
		data.append("data", _image);
		
		var url = this.getApiUrl();
		return fetch(url + "/products/" + _id + "/image", {
  			mode: "no-cors",			
		      method: "POST",
		      headers: {
		        "Accept": "application/json",
		        "type": "formData"
		      },
		      body: data
		}).then(function(res) {
			return
		});
	}	
}
