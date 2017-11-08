import React, {Component} from 'react'; 
import {Card, Col, CardBody, CardImg, CardSubtitle, CardText} from 'reactstrap'; 
import {Link} from 'react-router-dom';

class ProductCard extends Component{
    render(){
        return(
            <Col md={4}>
                <Link to={'/product/' }>
                    <Card>
                        <CardImg top width="100%" height='130px' src="http://via.placeholder.com/300x130" alt="Placeholder image" />
                        <CardBody>
                            <CardSubtitle>{this.props.name}</CardSubtitle>
                            <hr/>
                            <CardText>    
                                {this.props.description}
                            </CardText>
                        </CardBody>
                    </Card>
                </Link>
            </Col>
        )
    }
}
export default ProductCard; 