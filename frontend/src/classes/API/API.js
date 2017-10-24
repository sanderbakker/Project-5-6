/* 
 * Base class for wrapper backend API
 * Provides the low level api calls. 
 *
*/

class API {
	constructor() {
		this.API_url = 'http://localhost:5000/api'
	} 

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

	get(_endpoint) {
		return fetch(this.API_url + _endpoint); 
	}
}

export { API }