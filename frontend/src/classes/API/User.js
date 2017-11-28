import {API} from './API.js';
import jwt_decode from 'jwt-decode'; 


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

    update_user_address(_user_id, _city, _street, _streetNumber, _zipcode, _address_id){
        return this.put('/account/users/' + _user_id + '/addresses/' + _address_id, {
            "city" : _city,
            "street": _street,
            "id": _address_id,
            "streetNumber": _streetNumber,
            "zipCode": _zipcode
        })
    }

    getAmountOfUsers(){
        return this.get('/account/users/amount'); 
    }
    
    getUsersPaginated(_page){
        return this.get('/account/users/withpagination/' + _page + '/10'); 
    }

	addCartProduct(_product_id) {
        return this.post('/account/users/' + jwt_decode(sessionStorage.getItem('id_token'))['id'] + '/cart/' + _product_id);
    }    
}
export {User}; 