import React, {Component} from 'react';
import {Card, CardBody, Col, Row, Button, ButtonGroup} from 'reactstrap'; 
import {Link} from 'react-router-dom'; 

class UserAddressCard extends Component {
    render(){
        return(
            <Col md={6}>
                <Card>
                    <CardBody>
                        
                            <Row>
                                <Col md={12} className="address-card">
                                    <b>Street: </b>{this.props.street} {this.props.streetNumber}
                                    <ButtonGroup className="float-right">
                                        <Link to={'/profile/edit/address/' + this.props.id}>                                            
                                        <Button  size='sm' color='warning'>
                                                <i className="fa fa-pencil"/>
                                        </Button>
                                        </Link>
                                        
                                        <Button onClick={()=>this.props.delete(this.props.id)} size='sm' color='danger'>
                                            <i className="fa fa-minus"/>
                                        </Button>
                                    
                                    </ButtonGroup>
                                    <br/>
                                    <b>Zipcode: </b>{this.props.zipcode} 
                                    <br/>
                                    <b>City: </b>{this.props.city}
                                    
                                </Col>
                            </Row>
                        
                    </CardBody>
                </Card>
            </Col>
        )
    }
}
export default UserAddressCard; 