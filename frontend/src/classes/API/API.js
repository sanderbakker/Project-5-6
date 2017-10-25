/** 
 * Base class for wrapper backend API
 * Provides the low level api calls. 
 */

class API {
	constructor() {
		this.API_url = 'http://localhost:50594/api'
		
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
		})
		.then(response => response.json())
		.then(function(response){
			console.log(response); 
			return response;
		})
		// .then(function(response) {
		// 	console.log(response.status);
		// 	return response.json();
		//   })
		
		.catch(error => {
			console.log(error); 
		});	
		
		
	}

	/**
	 * Sends GET request to API.
	 *
	 * var _endpoint  - (String) API endpoint (part after the base URL). 
	 */	

	async get(_endpoint) {
		let response = await fetch(this.API_url + _endpoint)
		.then(response => response.json())
		.then(response => {
			return response; 
		}); 
	}
}

// Export API for global use
export { API }