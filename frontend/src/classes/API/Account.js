import {API} from '../API/API.js';

class Account extends  {
	constructor() {
		super();
	} 

	login(_email, _password) {
		this.post('/account/sign-in', {_email, _password})

	}
}