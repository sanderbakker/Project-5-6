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

	post(_endpoint, _data) {
		return fetch(this.API_url + _endpoint, { 
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(_data)
		});	
	}

	/**
	 * Sends GET request to API.
	 *
	 * var _endpoint  - (String) API endpoint (part after the base URL). 
	 */	

	get(_endpoint) {
		return fetch(this.API_url + _endpoint); 
	}
}

// Export API for global use
export { API }