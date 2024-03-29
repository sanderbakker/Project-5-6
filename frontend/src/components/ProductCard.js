import React, {Component} from 'react'; 
import {Card, Col, CardBody, CardImg, CardSubtitle, CardText, Button, ButtonGroup} from 'reactstrap'; 
import AdminProductForm from './AdminProductForm.js'; 
import Product from './Product.js'; 
import {User} from '../classes/API/User.js'; 

import ShoppingCart from './ShoppingCart.js';
import NotificationAlert from 'react-notification-alert'; 


class ProductCard extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
        };

        this.User = new User();
        this.highlightItem = this.highlightItem.bind(this); 
        this.notify = this.notify.bind(this);    
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

    notify(_message, _type){
        var options = {
            place: 'tr',
            message: (
                <div>
                    {_message}
                </div>
            ),
            type: _type,
            autoDismiss: 2
        }
        this.refs.notify.notificationAlert(options);
      }
    
    toggleShoppingCart() {
        this.setState({showCart: false});
    }
    
    highlightItem(itemId){
        var item = document.getElementById(itemId);
        item.style.boxShadow =  "10px 0px 78px -13px rgba(44,53,68,1)"; 
        setTimeout(() => {
            item.style.removeProperty("box-shadow")
        }, 750);
    }

    render(){
        return(
            <Col md={4}>
                <NotificationAlert ref="notify" />
                    <Card id={this.props.id}>
                        <ShoppingCart isOpen={this.state.showCart} onHide={f => this.toggleShoppingCart()} />                        
                        <CardImg top width="100%" height='130px' src={"data:image/jpg;base64," + this.props.image1} alt="Placeholder image" /> 
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
                                        onClick={() => {if(window.confirm('Delete this item?')) this.props.delete(this.props.id, this.props.name)}}>
                                        <i className="fa fa-minus"/>    
                                    </Button>
                                : ""}
                            </ButtonGroup>

                            <ButtonGroup size="sm" className="float-right ">
                                {this.props.admin ? 
                                <AdminProductForm highlight={this.highlightItem} id={this.props.id} force={this.props.forceUpdate} products={this.props.updateProducts} action="edit">Edit</AdminProductForm>
                                : ""}
                                {this.props.isAuction ? 
                                    <Button onClick={this.toggle} size="sm" color="warning">                                        
                                        <i className="fa fa-legal"/>
                                    </Button>                            
                                : [
                                    (this.props.quantity > 0 ? 
                                    <Button onClick={f => this.addProductToCart()} size="sm" color="success" className="float-right line-height-edit">
                                        <i className="fa fa-shopping-cart"/>
                                    </Button>
                                    : <Button onClick={() => this.notify(this.props.name + " is not in stock", "warning")} size="sm" color="success" className="float-right line-height-edit">
                                        <i className="fa fa-shopping-cart"/>
                                        </Button>
                                    )
                                 ]
                                }
                            </ButtonGroup>               
                        </CardBody>
                    </Card>
          
            </Col>
        )
    }
}
export default ProductCard; 