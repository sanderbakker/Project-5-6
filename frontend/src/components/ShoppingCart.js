import React, {Component} from 'react';
import {ModalFooter, ModalHeader, Modal, ModalBody, Input, Button, Table, Col} from 'reactstrap'; 
import Loading from './Loading.js';

import {User} from '../classes/API/User.js';

class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.User = new User();
        this.state = {products: false, fetching: true};
    }

    componentWillMount() {
        this.User.getCart().then(
            (val) => {
                this.setState({products: val, fetching: false});
                console.log(this.state.products);
            }
        );

    }

    deleteProduct(product_id) {
        let bool = window.confirm("Are you sure you want to delete this product?"); 
        
        if(bool) {
            console.log(product_id);            
        }
    }

    updateProduct(e, product_id) {
        if(e.target.value !== "") 
            console.log(e.target.value);
    }

    render() {
        if(this.state.fetching){
            return(
                <Col md={10}>
                    <Loading />
                </Col>
            )
        }
        return (
            <Modal isOpen={this.props.isOpen} >
             <ModalHeader toggle={this.props.onHide}>Shopping cart</ModalHeader>            
             <ModalBody>
                <Table hover={true}>
                 <tbody>
                 {this.state.products.map((item, i) => {
                  return (<tr>
                    <td>{item.name}</td>
                    <td>€ {item.price}</td>
                    <td><Input type="number" size="sm" className="sm-input" onChange={f => this.updateProduct(f, item.id)} /></td>                    
                    <td><Button color="danger" size="sm" onClick={f => this.deleteProduct(1)}><i className="fa fa-minus"/></Button></td>
                  </tr>)
                 })
                }
                 </tbody>
                </Table> 
             </ModalBody>
             <ModalFooter>
                <Button className="btn-block" color="info"><i className="fa fa-shopping-cart" /> Check out</Button>
             </ModalFooter>
            </Modal>        
        );
    }

}

export default ShoppingCart;