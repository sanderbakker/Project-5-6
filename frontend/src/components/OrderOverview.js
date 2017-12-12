import React, {Component} from 'react'; 
import {Container, Row, Col, CardBody, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Products} from '../classes/API/Products.js'; 
import {Orders} from '../classes/API/Orders.js';
import {User} from '../classes/API/User.js';

import {Form, FormGroup, Label, Input, Button, Table, Card} from 'reactstrap'; 



class OrderOverview extends Component {
    constructor(props){
        super(props);
        this.state = {orders: [], fetching: true}
        this.User = new User();
    }        

    componentWillMount() {
        this.User.getOrders().then(
            (value) => {
                this.setState({orders: value, fetching: false, order_details: [], modal: false});
            }
        );
    }

    showOverview(e) {
        this.setState({fetching_details: true, modal: true});
        console.log(e.target.value);        

        this.User.getOrder(e.target.value).then(
            (value) => {
                console.log(value);
                this.setState({order_details: value, fetching_details: false});
            }
        );
    }

    hideOverview() {
        this.setState({modal: false, order_details: []});
    }

    render() {
        return (
        <Card>
        <Modal isOpen={this.state.modal}>
            {this.state.modal && !this.state.fetching_details ?
             <div>
                <ModalHeader toggle={f => this.hideOverview()}>Order {this.state.order_details.order_id}</ModalHeader>
                <ModalBody>
                    <p>Shipment: {this.state.order_details.shipping_provider}</p>
                    <p>Payment: {this.state.order_details.payment_provider}</p>
                    <Card>
                     <Table hover={true}>
                      <tbody>
                        {this.state.order_details.products.map((item, i) => {
                            
                        return (<tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>€ {item.price * item.quantity}</td>
                            <td><Input type="number" pattern="[0-9]" value={item.quantity} size="sm" className="sm-input"/></td>                    
                        </tr>)
                        })
                        }
                        <tr>
                            <td><b>Total</b></td>
                            <td></td>
                            <td>€ {this.state.order_details.total_price}</td>
                            <td></td>
                        </tr>
                      </tbody>
                     </Table>                 
                    </Card>                      
                </ModalBody>                               
             </div>
            : null}
        </Modal>  
         <CardBody>
            {!this.state.fetching && this.state.orders.length > 0 ?
                <Table hover={true}>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    {this.state.orders.map((item, i) => {
                     return ( <tr key={i}>
                         <td>{item.orderId}</td>
                         <td>{item.statusString}</td>
                         <td>€ {item.totalPrice}</td>
                         <td><Button color='info' value={item.orderId} onClick={f => this.showOverview(f)}>Overview</Button></td>
                     </tr> );
                    })}
                </tbody>    
                </Table>
            : !this.state.fetching && this.state.orders.length === 0 ?
                <p>No orders have been placed yet.</p>
            : null} 
         </CardBody>
        </Card>
        )
    }

}

export default OrderOverview;