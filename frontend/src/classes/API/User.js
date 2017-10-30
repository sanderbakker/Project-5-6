import {API} from './API.js';

class User extends API{
    user_data(_id){
		return this.get('/account/users/' + _id); 
    }
    add_address(_street, _streetNumber, _city, _zipcode, _id){
        return this.post('/account/users/' + _id + '/addresses', 
                        {"street": _street, "streetNumber": _streetNumber, "city": _city, "zipCode": _zipcode}); 
    }
}
export {User}; 