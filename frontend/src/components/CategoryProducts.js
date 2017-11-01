import React, {Component} from 'react'; 
import {Col, Row, Container} from 'reactstrap'; 

class CategoryProducts extends Component{

    componentWillMount(){

    }
    render(){
        return(
            <Container className='content-container'> 
                <Row>
                    <Col md="12">
                        <h4 className="mb-0">{this.props.name}</h4>
                        <hr></hr>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default CategoryProducts;