import React, {Component} from 'react'; 
import {Container, Row, Col} from 'reactstrap';
import {Products} from '../classes/API/Products.js'; 
import {Orders} from '../classes/API/Orders.js';
import {User} from '../classes/API/User.js';

import {Form, FormGroup, Label, Input, Button, Table, Card} from 'reactstrap'; 



class Order extends Component {
    constructor(props){
        super(props);
        this.state = {paymentProviders: [], shipmentProviders: [], products: []}
        this.Orders = new Orders();
        this.User = new User();
    }    

    componentWillMount() {
        this.Orders.getPaymentProviders().then(
            (value) => { this.setState({paymentProviders: value})}
        );
        this.Orders.getShipmentProviders().then(
            (value) => { this.setState({shipmentProviders: value})}
        );
        this.User.getCart().then(
            (value) => {
                let products = Object.keys(value.products).map(function (key) { return value.products[key]; });
                this.setState({products: products, fetching: false, total_price: value.total_price, total_products: value.total_quantity});             
            }
        );
    }

    handleShipmentChange(e) {
        this.setState({shipment: e.target.value});
    }

    handlePaymentChange(e) {
        this.setState({payment: e.target.value});
    }

    submitForm() {

    }

    render() {
        return ( 
        <Container className="content-container">
            <Form>
            <FormGroup tag="fieldset">
                <legend>Shipment</legend>
                    {this.state.shipmentProviders.map((item, i) => {  
                        return (
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" 
                            name="shipment" 
                            value={item}
                            checked={this.state.shipment === item}
                            onChange={e => this.handleShipmentChange(e) }
                             />{' '}
                            {item}
                        </Label>
                        </FormGroup>)
                    })}

            </FormGroup>
            <FormGroup tag="fieldset">
                <legend>Payment</legend>
                    {this.state.paymentProviders.map((item, i) => {  
                        return (
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" 
                            name="payment"
                            value={item}
                            checked={this.state.payment === item}
                            onChange={e => this.handlePaymentChange(e) }                            
                            />{' '}
                            {item}
                        </Label>
                        </FormGroup>)
                    })}

            </FormGroup>
            <legend>Overview</legend>
            <Col md="8">            
            <Card>
            <Table hover={true}>
                    <tbody>
                    {this.state.products.map((item, i) => {
                        
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
                        <td>€ {this.state.total_price}</td>
                        <td></td>
                    </tr>
                  </tbody>
                 </Table>                 
            </Card>              
            </Col>
            <Button color="info" onClick={f => this.submitForm()}>Place Order</Button>            
            </Form>
        </Container>
        )
    }
}

export default Order; 