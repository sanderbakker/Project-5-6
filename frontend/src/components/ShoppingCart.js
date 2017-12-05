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
                var amountArray = [];
                for(var i in val) { 
                    amountArray[i] = (val[i]); 
                    this.products.getProduct(i).then(
                        (value) => {
                            var productsArray = this.state.products;
                            productsArray[value.id] = value; 
                            this.setState({products: productsArray, fetching: false});
                        }
                    ) 
                }
                this.setState({amount: amountArray});
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
        var amountArray = this.state.amount;
        amountArray[i] = e.target.value;
        this.setState({amount: amountArray});
        
        if(e.target.value !== '') {
            this.User.updateCartProduct(product_id, e.target.value).then(
                (value) => {
                    this.loadCart();
                }
            ); 
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
                        <td>€ {item.price * this.state.amount[i]}</td>
                        <td><Input type="number" pattern="[0-9]" value={this.state.amount[i]} size="sm" className="sm-input" onChange={f => this.handleInputChange(f, i, item.id)}/></td>                    
                        <td><Button color="danger" size="sm" onClick={f => this.deleteProduct(i)}><i className="fa fa-minus"/></Button></td>
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