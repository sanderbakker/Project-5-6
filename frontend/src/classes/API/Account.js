import {API} from '../API/API.js';

class Account extends API  {
	constructor() {
		super();
	} 

	login(_email, _password) {
		this.post('/account/sign-in', {_email, _password})
	}

	register(_email, _password){
		this.post('/account', {"email": _email, "password": _password}); 
	}
}
export {Account}; 