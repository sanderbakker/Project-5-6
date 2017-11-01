import React, {Component} from 'react';
import {Card, CardBody, CardText, Col, Row, Button, ButtonGroup} from 'reactstrap'; 
import {Link} from 'react-router-dom'; 

class UserAddressCard extends Component {
    render(){
        return(
            <Col md={6}>
                <Card>
                    <CardBody>
                        <CardText>
                            <Row>
                                <Col md={12} >
                                    <div className="address-card">
                                    <b>Street: </b>{this.props.street} {this.props.streetNumber}
                                    <ButtonGroup className="float-right">
                                        <Link to={'/profile/edit/address/' + this.props.id}>                                            <Button addressId={this.props.id} size='sm' color='warning'>
                                                <i className="fa fa-pencil"/>
                                            </Button>
                                        </Link>
                                        <Button addressId={this.props.id} size='sm' color='danger'>
                                            <i className="fa fa-minus"/>
                                        </Button>
                                    </ButtonGroup>
                                    <br/>
                                    <b>Zipcode: </b>{this.props.zipcode} 
                                    <br/>
                                    <b>City: </b>{this.props.city}
                                    </div>
                                </Col>
                            </Row>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}
export default UserAddressCard; 