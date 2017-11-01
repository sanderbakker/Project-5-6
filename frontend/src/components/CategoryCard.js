import React, {Component} from 'react';
import {Card, CardBody, Col, CardImg, CardSubtitle} from 'reactstrap'; 
import {Link} from 'react-router-dom'; 

class CategoryCard extends Component {
    constructor(props){
        super(props);
        
    }
    render(){
        return(
        
                <Col md={3}>
                    <Link to={'/categories/' + this.props.title.toLowerCase()}>
                        <Card>
                            <CardImg top width="100%" height='130px' src={this.props.image} alt={this.props.title} />
                            <CardBody>
                                <CardSubtitle>{this.props.title}</CardSubtitle>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
        
        )
    }
}

export default CategoryCard; 