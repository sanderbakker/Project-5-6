import React, {Component} from 'react'; 
import {Card, Col, CardBody, CardImg, CardSubtitle, CardText, Button} from 'reactstrap'; 
import {Link} from 'react-router-dom';

class ProductCard extends Component{
    render(){
        return(
            <Col md={4}>
                <Link to={'/product/' + this.props.id }>
                    <Card>
                        <CardImg top width="100%" height='130px' src="http://via.placeholder.com/300x130" alt="Placeholder image" />
                        <CardBody>
                            <CardSubtitle><b>{this.props.name}</b>
                            {this.props.admin ? 
                                <Link to={'/admin/edit/product/' + this.props.id}>
                                    <Button color="warning" size="sm" className='float-right line-height-edit'>
                                        <i className="fa fa-edit"/>
                                    </Button>
                                </Link>
                            : "" }
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
                        </CardBody>
                    </Card>
                </Link>
            </Col>
        )
    }
}
export default ProductCard; 