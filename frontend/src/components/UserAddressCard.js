import React, {Component} from 'react';
import {Card, CardBody, CardText, Col, Row, Button} from 'reactstrap'; 

class UserAddressCard extends Component {
    render(){
        return(
            <Col md={6}>
                <Card>
                    <CardBody>
                        <CardText>
                            <Row>
                                <Col md={12}>
                                    <div className="address-card">
                                    <b>Street: </b>{this.props.street} {this.props.streetNumber}
                                    <Button size='sm' className="float-right" color='warning'>
                                        <i className="fa fa-pencil"/>
                                    </Button>
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