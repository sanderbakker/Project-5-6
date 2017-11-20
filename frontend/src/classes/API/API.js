/** 
 * Base class for wrapper backend API
 * Provides the low level api calls. 
 */

class API {
	constructor() {
		this.API_url = 'http://127.0.0.1:5000/api'
		
	} 

	

	/**
	 * Sends POST request to API.
	 *
	 * var _endpoint  - (String) API endpoint (part after the base URL). 
	 * var _data 	  - (Array) array that will be send to the server. 
	 *
	 * returns promise 
	 */

	async post(_endpoint, _data) {
		let response = await fetch(this.API_url + _endpoint, { 
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(_data)
		})
		
		return response.json();
	}

	async put(_endpoint, _data){
		let response = await fetch(this.API_url + _endpoint, {
			method: "PUT", 
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(_data)
		})

		return response; 
	}

	/**
	 * Sends GET request to API.
	 *
	 * var _endpoint  - (String) API endpoint (part after the base URL). 
	 *
	 * returns promise
	 */	

	async get(_endpoint) {
		let response = await fetch(this.API_url + _endpoint);
		return response.json();
	}
	
	/**
	 * Sends DELETE request to API.
	 *
	 * var _endpoint  - (String) API endpoint (part after the base URL). 
	 *
	 * returns promise
	 */	

	async delete(_endpoint){
		let response = await fetch(this.API_url + _endpoint, {
			method: "DELETE"
		}); 
		return response; 
	}
}

// Export API for global use
export { API }