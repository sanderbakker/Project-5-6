import React, {Component} from 'react'; 
import {Card, Col, CardBody, CardImg, CardSubtitle, CardText, Button, ButtonGroup} from 'reactstrap'; 
import AdminProductForm from './AdminProductForm.js'; 
import Product from './Product.js'; 
import {User} from '../classes/API/User.js'; 

import ShoppingCart from './ShoppingCart.js';


class ProductCard extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };

        this.User = new User();
      }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    addProductToCart() {
        this.User.addCartProduct(this.props.id);
        this.setState({showCart: true});
    }
    
    toggleShoppingCart() {
        this.setState({showCart: false});
    }

    render(){
        return(
            <Col md={4}>
                    <Card>
                        <ShoppingCart isOpen={this.state.showCart} onHide={f => this.toggleShoppingCart()} />                        
                        <CardImg top width="100%" height='130px' src="http://via.placeholder.com/300x130" alt="Placeholder image" />   
                        <CardBody>
                            <CardSubtitle><b>{this.props.name}</b>
                            </CardSubtitle>
                            <hr className="hr-margin-bottom"/>
                            <CardText>  
                                <i>Price: € {this.props.price.toLocaleString(
                                                    undefined,
                                                    { minimumFractionDigits: 2 }
                                                    )},-</i>
                                <br/>  
                                
                                {this.props.description}
                            </CardText>
                            
                            <ButtonGroup className="float-left">
                                <Product id={this.props.id}/>
                                {this.props.admin ?
                                    <Button 
                                        size="sm" 
                                        color="danger"
                                        onClick={() => {if(window.confirm('Delete this item?')) this.props.delete(this.props.id)}}>
                                        <i className="fa fa-minus"/>    
                                    </Button>
                                : ""}
                            </ButtonGroup>

                            <ButtonGroup size="sm" className="float-right line-height-edit">
                                {this.props.admin ? 
                                <AdminProductForm id={this.props.id} products={this.props.updateProducts} action="edit">Edit</AdminProductForm>
                                : ""}
                                <Button onClick={f => this.addProductToCart()} size="sm" color="success" className="float-right line-height-edit">
                                    <i className="fa fa-shopping-cart"/>
                                </Button>
                            </ButtonGroup>               
                        </CardBody>
                    </Card>
          
            </Col>
        )
    }
}
export default ProductCard; 