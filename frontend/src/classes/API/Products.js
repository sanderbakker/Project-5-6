
import {API} from '../API/API.js';

export class Products extends API {
	constructor() {
		super();
	}

	getProducts() {
		return this.get('/products')
	}
}
