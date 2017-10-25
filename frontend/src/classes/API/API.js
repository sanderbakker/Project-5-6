/** 
 * Base class for wrapper backend API
 * Provides the low level api calls. 
 */

class API {
	constructor() {
		this.API_url = 'http://localhost:5000/api'
	} 

	/**
	 * Sends POST request to API.
	 *
	 * var _endpoint  - (String) API endpoint (part after the base URL). 
	 * var _data 	  - (Array) array that will be send to the server.  
	 */

	async post(_endpoint, _data) {
		let response = fetch(this.API_url + _endpoint, { 
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(_data)
		});	

		return response.json();
	}

	/**
	 * Sends GET request to API.
	 *
	 * var _endpoint  - (String) API endpoint (part after the base URL). 
	 */	

	async get(_endpoint) {
		let response = await fetch(this.API_url + _endpoint); 
		return response.json();
	}
}

// Export API for global use
export { API }