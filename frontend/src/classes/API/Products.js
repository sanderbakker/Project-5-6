
import {API} from '../API/API.js';

export class Products extends API {

	getProducts() {
		return this.get('/products')
	}
	getCategories(){
		return this.get('/products/categories'); 
	}
}
