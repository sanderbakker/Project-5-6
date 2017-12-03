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
        this.state = {products: this.loadCart(), fetching: true};
    }
    
    

    loadCart() {
        this.User.getCart().then(
            (val) => {
            
                var productsArray = []; 
                var amountArray = []; 
                for(var i in val) {
                    amountArray.push(val); 
                    this.products.getProduct(i).then(
                        (value) => {
                            productsArray.push(value); 
                        }
                    ) 
                }
                
                this.setState({products: productsArray, amount: amountArray, fetching: false});
            }
        );

    }

    deleteProduct(product_id) {
        let bool = window.confirm("Are you sure you want to delete this product?"); 
        
        if(bool) {
                 
            this.loadCart();       
        }
    }

    updateProduct(e, product_id) {
        if(e.target.value !== "") 
            console.log(e.target.value);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} >
            {this.state.isOpen ? this.loadCart() : null}
            <ModalHeader toggle={this.props.onHide}>Shopping cart</ModalHeader>   
            <ModalBody>
                {!this.state.fetching ? 
                    <Table hover={true}>
                    <tbody>
                    {this.state.products.map((item, i) => {
                        
                    return (<tr>
                        <td>{item.name}</td>
                        <td>€ {item.price}</td>
                        <td><Input type="number" value={this.state.amount[i]} size="sm" className="sm-input" onChange={f => this.updateProduct(f, item.id)} /></td>                    
                        <td><Button color="danger" size="sm" onClick={f => this.deleteProduct(1)}><i className="fa fa-minus"/></Button></td>
                    </tr>)
                    })
                    }
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