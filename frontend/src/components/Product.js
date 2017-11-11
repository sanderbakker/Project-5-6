import React, {Component} from 'react'; 
import {Col, Row, Container} from 'reactstrap';
import {Products} from '../classes/API/Products.js'; 
import ProductCarousel from './ProductCarousel.js';

class Product extends Component {
    constructor(props){
        super(props); 
        this.products = new Products();
        this.state = {fetching: true}
    }

    componentWillMount(){
        this.products.getProduct(this.props.match.params.id).then(
            (val) => this.setState({currentProduct: val, fetching: false})
        )
    }

    render(){
        if(this.state.fetching){
            return(<div></div>)
        }
        return(
            <Container className="content-container">
                <Row>
                    <Col md={12}>
                        <h4 className="mb-0">{this.state.currentProduct.name}</h4>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <ProductCarousel/>
                    
                    </Col>
                    <Col md={6}>
                        <p className="font-md"><b>€ {this.state.currentProduct.price.toLocaleString(
                                                    undefined,
                                                    { minimumFractionDigits: 2 }
                                                    )} ,- </b></p>
                        <i className="fa fa-check font-md check"></i>
                        <p className="font-md"> Delivered within a week</p>
                        <br/><br/>
                        <button className="btn btn-block btn-info btn-sm" onclick="">Add to shopping cart</button>
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
                        <p className="font-md"><i className="fa fa-check font-md check"></i> HRO is the best seller of luxury in 2017</p>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col md={6}>
                        <h5>Additional information</h5>
                    </Col>
                    <Col md={6}>
                        <h5>Customizables</h5>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Product; 