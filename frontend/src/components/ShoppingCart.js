import React, {Component} from 'react';
import {ModalFooter, ModalHeader, Modal, ModalBody, Input, Button, Table, Col} from 'reactstrap'; 
import Loading from './Loading.js';

import {User} from '../classes/API/User.js';
import {Products} from '../classes/API/Products.js'; 

class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.User = new User();
        this.products = new Products(); 
        this.state = {products: [], fetching: true};
    }
    
    

    loadCart(initialLoad) {
        this.User.getCart().then(
            (val) => { 
                console.log(val); 
                var products = [];
                for(var i in val.products){ 
                    var product = {
                        "id": i, 
                        "name": val.products[i]["name"],
                        "quantity": val.products[i]["quantity"],
                        "price": val.products[i]["price"]
                    }
                    products[i] = product; 
                }
                this.setState({products: products, fetching: false, total_price: val.total_price, total_products: val.total_quantity}); 
            } 
        );
        
    }

    deleteProduct(product_id) {
        let bool = window.confirm("Are you sure you want to delete this product?"); 
        
        if(bool) {  
            this.User.deleteCartProduct(product_id).then(
                (value) => {
                    this.setState({products: [], fetching: true});                    
                    this.loadCart()
                }
            );
        }
    }

    handleInputChange(e, i, product_id) {
        if(e.target.value >= 0){
            var tempArray = this.state.products;
            var updateProduct = {
                "id": product_id,
                "name": this.state.products[i].name,
                "price": this.state.products[i].price,
                "quantity": e.target.value 
            } 
            
            tempArray.splice(product_id, 1); 
            tempArray[product_id] = updateProduct;

            this.setState({products: tempArray});  
            
            if(e.target.value !== '') {
                this.User.updateCartProduct(product_id, e.target.value).then(
                    (value) => {
                        this.loadCart();
                    }
                ); 
            }
        }
    } 

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onOpened={ f => this.loadCart(true)} >
            <ModalHeader toggle={this.props.onHide}>Shopping cart</ModalHeader>   
            <ModalBody>
                {!this.state.fetching ? 
                    <Table hover={true}>
                    <tbody>
                    {this.state.products.map((item, i) => {
                        
                    return (<tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>€ {item.price * item.quantity}</td>
                        <td><Input type="number" pattern="[0-9]" value={item.quantity} size="sm" className="sm-input" onChange={f => this.handleInputChange(f, i, item.id)}/></td>                    
                        <td><Button color="danger" size="sm" onClick={f => this.deleteProduct(i)}><i className="fa fa-minus"/></Button></td>
                    </tr>)
                    })
                    }
                    <tr>
                        <td><b>Total</b></td>
                        <td></td>
                        <td>€ {this.state.total_price}</td>
                        <td></td>
                        <td></td>
                    </tr>
                  </tbody>
                 </Table> 
                : null }
             </ModalBody>
            <ModalFooter>
                <Button className="btn-block" color="info"><i className="fa fa-shopping-cart" /> Check out</Button>
            </ModalFooter>
            </Modal>        
        );
    }

}

export default ShoppingCart;