
import {API} from '../API/API.js';

export class Products extends API {

	getProducts() {
		return this.get('/products')
	}
	getCategories(){
		return this.get('/products/categories'); 
	}
	getProductsInCategory(_category){
		return this.get('/products/withcategory/' + _category); 
	}

	getProductsAmount(){
		return this.get('/products/amount'); 
	}
	getProductsPaginated(_page_number){
		return this.get('/products/paginated/' + _page_number + '/9')
	}
	addProduct(_price, _description, _category, _name){
		return this.post('/products', 
						{
							"name": _name,
							"price": _price,
							"description": _description,
							"category": _category
						}
					)
	}
}
