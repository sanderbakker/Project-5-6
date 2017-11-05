
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
}
