import React, {Component} from 'react'; 
import {Col, Row, Container} from 'reactstrap';
import {Products} from '../classes/API/Products.js'; 
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
                
                </Row>
            </Container>
        )
    }
}
export default Product; 