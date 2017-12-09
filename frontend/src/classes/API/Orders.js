import {API} from '../API/API.js';

export class Orders extends API {
    getShipmentProviders() {
		return this.get('/orders/shipmentproviders');
    }
    
    getPaymentProviders() {
        return this.get('/orders/paymentproviders');
    }
}