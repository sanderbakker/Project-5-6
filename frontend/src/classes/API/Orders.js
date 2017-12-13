import {API} from '../API/API.js';

export class Orders extends API {
    getShipmentProviders() {
		return this.get('/orders/shipmentproviders');
    }
    
    getPaymentProviders() {
        return this.get('/orders/paymentproviders');
    }

    getStatuses() {
        return this.get('/orders/statuses');
    }
    
    getOrders() {
        return this.get('/orders');
    }
    updateStatus(_order_id, _status) {
        return this.put('/orders/' + _order_id + '/status' + '/' + _status);
    }

}