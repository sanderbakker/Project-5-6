import React, {Component} from 'react'; 
import {Container, Col} from 'reactstrap';
// import {Products} from '../classes/API/Products.js'; 
import {Orders} from '../classes/API/Orders.js';
import {User} from '../classes/API/User.js';

import {Form, FormGroup, Label, Input, Button, Table, Card} from 'reactstrap'; 



class Order extends Component {
    constructor(props){
        super(props);
        this.state = {paymentProviders: [], shipmentProviders: [], products: [], finished: false}
        this.Orders = new Orders();
        this.User = new User();
    }    

    componentWillMount() {
        this.Orders.getPaymentProviders().then(
            (value) => { this.setState({paymentProviders: value, payment: value[0]})}
        );
        this.Orders.getShipmentProviders().then(
            (value) => { this.setState({shipmentProviders: value, shipment: value[0]})}
        );
        this.User.getCart().then(
            (value) => {
                var products = [];
                for(var i in value.products){ 
                    var product = {
                        "id": i, 
                        "name": value.products[i]["name"],
                        "quantity": value.products[i]["quantity"],
                        "price": value.products[i]["price"],
                        "customizations": value.products[i]["customizations"]
                    }
                    products[i] = product; 
                }
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
        this.User.cartToOrder({
            'paymentProvider': this.state.payment,
            'shipmentProvider': this.state.shipment
        }).then(
            (value) => {
                this.setState({finished: true});
            }
        );
    }

    render() {
        return ( 
        <Container className="content-container">
        {this.state.finished ? <h2>Order created succesfully!</h2> :
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
                        {console.log(item)}
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td><Input type="number" pattern="[0-9]" value={item.quantity} size="sm" className="sm-input"/></td>                    
                        <td>€ {item.price * item.quantity}</td>
                    </tr>)
                    })
                    }
                    <br/>
                    {this.state.products.map((item, i) => {
                        
                        return Object.entries(item.customizations).map(([key, value]) => {
                        return (
                        <tr>
                            <td>{key}</td>
                            <td>{item.name}</td>
                            <td>{item.customizations[key].name}</td>
                            <td>€ {item.customizations[key].price}</td>                            
                        </tr>)
                        })
                    
                    })}
                    <tr>
                        <td><b>Total</b></td>
                        <td></td>
                        <td></td>
                        <td>€ {this.state.total_price}</td>                        
                    </tr>
                  </tbody>
                 </Table>                 
            </Card>              
            </Col>
            <Button color="info" onClick={f => this.submitForm()}>Place Order</Button>            
            </Form>
        }
        </Container>
        )
    }
}

export default Order; 