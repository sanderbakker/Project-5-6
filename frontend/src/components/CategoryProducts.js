import React, {Component} from 'react'; 
import {Col, Row, Container} from 'reactstrap';
import {Products} from '../classes/API/Products.js';  
import ProductCard from './ProductCard.js'; 

class CategoryProducts extends Component{
    constructor(props){
        super(props); 
        this.state = {products: null}
        this.products = new Products(); 
    }

    componentWillMount(){
        this.products.getProductsInCategory(this.props.name).then(
            (val) => {
                this.setState({products: val}); 
            }
        )
    }

    render(){
        return(
            <Container className='content-container'> 
                <Row>
                    <Col md={12}>
                        <h4 className="mb-0">{this.props.name}</h4>
                        <hr></hr>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        Some space for possible filters in the future 
                    </Col>
                    <Col md={10}>
                        <Row>
                            {this.state.products && this.state.products.map(function(item, i){
                                return <ProductCard key={item.id} name={item.name} description={item.description} />
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default CategoryProducts;