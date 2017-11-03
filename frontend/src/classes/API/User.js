import {API} from './API.js';

class User extends API{
    user_data(_id){
		return this.get('/account/users/' + _id); 
    }
    add_address(_street, _streetNumber, _city, _zipcode, _id){
        return this.post('/account/users/' + _id + '/addresses', 
                        {"street": _street, "streetNumber": _streetNumber, "city": _city, "zipCode": _zipcode}); 
    }
    get_addresses(_id){
        return this.get('/account/users/' + _id + '/addresses'); 
    }
    get_address_by_id(_user_id, _address_id){
        console.log('/account/users/'+ _user_id + '/addresses/' + _address_id);
        return this.get(('/account/users/'+ _user_id + '/addresses/' + _address_id));
    }
    delete_address_by_id(_user_id, _address_id){
        return this.delete(('/account/users/'+ _user_id + '/addresses/' + _address_id));   
    }

    update_user_profile(_user_id, _firstname, _lastname){
        return this.put('/account/users/' + _user_id, 
                        {
                            "id": _user_id,
                            "firstName": _firstname,
                            "lastName": _lastname 
                        }
                    )
    }
}
export {User}; 