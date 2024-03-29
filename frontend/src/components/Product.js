import React, {Component} from 'react'; 
import {Col, Row, Modal, Button, ModalBody, ModalHeader} from 'reactstrap';
import {Products} from '../classes/API/Products.js'; 
import ProductCarousel from './ProductCarousel.js';
import {User} from '../classes/API/User.js';

import Auction from './Auction.js'; 
import ShoppingCart from './ShoppingCart.js';
import CustomCard from './CustomCard.js';

class Product extends Component {
    constructor(props){
        super(props); 
        this.products = new Products();
        this.state = {fetching: true, modal: false}
        this.toggle = this.toggle.bind(this); 
        this.showCart = false;
        this.User = new User();
        this.triggerProduct = this.triggerProduct.bind(this);
    }

    componentWillMount(){
        this.triggerProduct(); 
    }
    triggerProduct(){
        this.products.getProductWithCustomizations(this.props.id).then(
            (val) => {
                this.setState({currentProduct: val, fetching: false})
            }
        )
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    addProductToCart() {
        this.User.addCartProduct(this.props.id);
        this.setState({showCart: true, modal: false});
    }
    
    toggleShoppingCart() {
        this.setState({showCart: false});
    }

    render(){
        if(this.state.fetching){
            return(<div></div>)
        }
        return(
            <div>
                <ShoppingCart isOpen={this.state.showCart} onHide={f => this.toggleShoppingCart()} />
                <Button size="sm" onClick={this.toggle}><i className="fa fa-eye"></i></Button>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}> {this.state.currentProduct.name} {this.state.name} {this.state.surname}</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col md={6}>
                                    <ProductCarousel
                                        id={this.props.id}
                                    />
                                </Col>
                                <Col md={6}>
                                {this.state.currentProduct.auction ? 
                                    <Auction
                                        productId={this.state.currentProduct.id}
                                        name={this.state.currentProduct.name}
                                        price={this.state.currentProduct.price}
                                    />
                            
                                :                                
                                    <div><p className="font-md"><b>€ {this.state.currentProduct.price.toLocaleString(
                                                                undefined,
                                                                { minimumFractionDigits: 2 }
                                                                )} ,- </b></p>
                                    <i className="fa fa-check font-md check"></i>
                                    <p className="font-md"> Delivered within a week</p>
                                    <br/><br/>
                                    <button className="btn btn-block btn-info btn-sm" onClick={f => this.addProductToCart()} >Add to shopping cart</button>
                                    <hr/>
                                    <p className="font-md"><i className="fa fa-check font-md check"></i> Fastest delivery</p>
                                    <br/>
                                    <p className="font-md"><i className="fa fa-check font-md check"></i> Order before monday and receive within the week</p>
                                    <br/>
                                    <p className="font-md"><i className="fa fa-check font-md check"></i> Cheapest on the market</p>
                                    <br/>
                                    <p className="font-md"><i className="fa fa-check font-md check"></i> Always on support by our helpdesk</p>
                                    <br/>
                                    <p className="font-md"><i className="fa fa-check font-md check"></i> HRO gets a 9 out of 10</p>
                                    <br/>
                                    <p className="font-md"><i className="fa fa-check font-md check"></i> HRO is the best seller of luxury in 2017</p></div>
                                }
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col md={6}>
                                    <h5>Additional information</h5>
                                </Col>
                                <Col md={6}>
                                    <h5>Customizations</h5>
                                    <Row>
                                        {this.state.currentProduct.customizations.map((item, i) => {
                                            return <CustomCard
                                                    description={item.description}
                                                    productId={this.state.currentProduct.id}
                                                    name={item.name}
                                                    price={item.price}
                                                    key={item.id}
                                                    id={item.id}
                                                    size="small"
                                                    product={true}
                                                    />
                                        })}
                                    </Row>
                                </Col>
                            </Row>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
export default Product; 