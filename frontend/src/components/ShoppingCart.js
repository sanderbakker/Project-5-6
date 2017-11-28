import React, {Component} from 'react';
import {ModalFooter, ModalHeader, Modal, ModalBody, Form, FormGroup, Input, Label, Button} from 'reactstrap'; 

class ShoppingCart extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} ><button onClick={this.props.onHide}>Close</button>
                <h4>Shopping cart</h4>
                
            </Modal>        
        );
    }

}

export default ShoppingCart;