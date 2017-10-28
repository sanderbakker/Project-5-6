import {API} from '../API/API.js';

class Account extends API  { 

	login(_email, _password) {
		return this.post('/account/login', {"email": _email, "password": _password})
	}

	register(_email, _password){
		return this.post('/account/register', {"email": _email, "password": _password}); 
	}
}
export {Account}; 