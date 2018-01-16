import React, {Component} from 'react';
import {ModalFooter, ModalHeader, Modal, ModalBody, Input, Button, Table} from 'reactstrap'; 
// import Loading from './Loading.js';

import {User} from '../classes/API/User.js';
import {Products} from '../classes/API/Products.js'; 

class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.User = new User();
        this.products = new Products(); 
        this.state = {products: [], fetching: true};
        this.deleteCustomization = this.deleteCustomization.bind(this); 
    }
    
    

    loadCart(initialLoad) {
        this.User.getCart().then(
            (val) => { 
                var products = [];
                for(var i in val.products){ 
                    var product = {
                        "id": i, 
                        "name": val.products[i]["name"],
                        "quantity": val.products[i]["quantity"],
                        "price": val.products[i]["price"],
                        "customizations": val.products[i]["customizations"]
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

    deleteCustomization(productId, customizationId, productName){
        let bool = window.confirm("Are you sure you want to remove this customization from " + productName);

        if(bool) {
            this.User.deleteCartCustomization(customizationId, productId).then(
                (value) => {
                    this.setState({products: [], fetching: true});
                    this.loadCart(); 
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
    
    goToOrders() {
        window.location.href = "/order";
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} onOpened={ f => this.loadCart(true)} >
            <ModalHeader toggle={this.props.onHide}>Shopping cart</ModalHeader>   
            <ModalBody>
                {!this.state.fetching && this.state.products.length === 0 ?
                    <p style={{textAlign:'center'}}>Shopping cart is empty, start shopping.</p>
                : null}
                {!this.state.fetching ? 
                    <Table hover={true}>
                    <tbody>
                    {this.state.products.length !== 0 ? <h5>Products</h5> : "" }
                    {this.state.products.map((item, i) => {
                    return (<tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td><Input type="number" pattern="[0-9]" value={item.quantity} size="sm" className="sm-input" onChange={f => this.handleInputChange(f, i, item.id)}/></td>                    
                        <td>€ {item.price * item.quantity}</td>
                        <td><Button color="danger" size="sm" onClick={f => this.deleteProduct(i)}><i className="fa fa-minus"/></Button></td>
                        </tr>
                    )
                    })
                    }
                    <br/>
                    {this.state.products.length !== 0 ? <h5>Customizations</h5> : "" }
                    {this.state.products.map((item, i) => {
                        
                        return Object.entries(item.customizations).map(([key, value]) => {
                        return (
                        <tr>
                            <td>{key}</td>
                            <td>{item.name}</td>
                            <td>{item.customizations[key].name}</td>
                            <td>€ {item.customizations[key].price}</td>
                            <td><Button color="danger" size="sm" onClick={f => this.deleteCustomization(item.id, key, item.name)}><i className="fa fa-minus"/></Button></td>
                            
                        </tr>)
                        })
                    
                    })}
                        
                    
                    <tr>
                        <td><b>Total</b></td>
                        <td></td>
                        <td></td>
                        <td>€ {this.state.total_price}</td>
                        <td></td>
                    </tr>
                  </tbody>
                 </Table> 
                : null }
             </ModalBody>
            <ModalFooter>
                {this.state.products.length === 0 ?
                     <Button className="btn-block" color="info" disabled><i className="fa fa-shopping-cart" /> Check out</Button>
                :    <Button className="btn-block" color="info" onClick={f => this.goToOrders()}><i className="fa fa-shopping-cart" /> Check out</Button>
                }
            </ModalFooter>
            </Modal>        
        );
    }

}

export default ShoppingCart;