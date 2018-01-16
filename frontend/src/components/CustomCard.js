import React, {Component} from 'react'
import {Card, CardTitle, CardSubtitle, CardBody, Col, CardText, Button, ButtonGroup} from 'reactstrap'
import AdminCustomForm from './AdminCustomForm.js';
import ShoppingCart from './ShoppingCart.js'; 
import { User } from '../classes/API/User';

class CustomCard extends Component {
    constructor(props){
        super(props);
        this.highlightItem = this.highlightItem.bind(this); 
        this.addToCart = this.addToCart.bind(this); 
        this.toggleShoppingCart = this.toggleShoppingCart.bind(this); 
        this.User = new User(); 
        this.state = {
            showCart: false
        }
    }
    highlightItem(itemId){
        var item = document.getElementById(itemId);
        item.style.boxShadow =  "10px 0px 78px -13px rgba(44,53,68,1)"; 
        setTimeout(() => {
            item.style.removeProperty("box-shadow")
        }, 750);
    }

    addToCart(){
        this.User.addCartCustomization(this.props.id, this.props.productId); 
        this.setState({showCart: true}); 
    }

    toggleShoppingCart() {
        this.setState({showCart: false});
    }
    
    render(){
        return(
            <Col md={4}>
                <ShoppingCart isOpen={this.state.showCart} onHide={f => this.toggleShoppingCart()} />                        
                <Card>
                    <CardBody>
                        <CardTitle id={this.props.size === "small" ? "small-card" : ""}>
                            {this.props.name}
                        </CardTitle>
                        
                        <CardSubtitle id={this.props.size === "small" ? "small-price" : ""} className="mb-2 text-muted">
                            € {this.props.price} ,- 
                        </CardSubtitle>
                        <CardText id={this.props.size === "small" ? "small-desc" : ""}>
                            {this.props.description}
                        </CardText>
                        <ButtonGroup size="sm" className="float-right ">
                            {this.props.admin ? 
                            <AdminCustomForm id={this.props.id} highlight={this.highlightItem} customization={this.props.updateCustom} action="edit">Edit</AdminCustomForm>
                            : ""}  
                            {this.props.product ? 
                            <Button id="small-button" onClick={() => this.addToCart()} className="pull-right" size={"sm"}><i className="fa fa-plus"/></Button>                             
                            : ""}
                        </ButtonGroup>   
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
export default CustomCard; 