import React, {Component} from 'react';
import {Card, CardBody, CardText, Col} from 'reactstrap'; 

class UserAddressCard extends Component {
    constructor(props){
        super(props); 
    }
    render(){
        return(
            <Col md={4}>
                <Card>
                    <CardBody>
                        <CardText>
                            <b>Street: </b>{this.props.street} {this.props.streetNumber}
                            <br/>
                            <b>Zipcode: </b>{this.props.zipcode} 
                            <br/>
                            <b>City: </b>{this.props.city}
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}
export default UserAddressCard; 