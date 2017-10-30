import React, {Component} from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import jwt_decode from 'jwt-decode'; 
import {User} from '../classes/API/User.js'; 

class UserAddress extends Component{
    constructor(props){
        super(props); 
        this.state = {street: null, streetNumber: null, zipcode: null, city: null}
        this.id = jwt_decode(sessionStorage.getItem('id_token'))['id'];
        this.handleFormChanges = this.handleFormChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    handleFormChanges(e){
        if(e.target.name === 'street'){
           this.setState({street: e.target.value});     
        }
        else if(e.target.name === 'streetNumber'){
            this.setState({streetNumber: e.target.value});
        }
        else if(e.target.name === 'zipcode'){
            this.setState({zipcode: e.target.value});
        }
        else if(e.target.name === 'city'){
            this.setState({city: e.target.value}); 
        }
    }
    handleSubmit(e){
        e.preventDefault(); 
        var user = new User(); 
        if(this.state.zipcode !== null && this.state.street !== null && this.state.streetNumber !== null && this.state.city !== null){
            var add_address_promise = user.add_address(this.state.street, this.state.streetNumber, this.state.city, this.state.zipcode, this.id);
            add_address_promise.then(
                (val) => {
                    if(val.constructor != Array){
                        this.setState({failed: true}); 
                    }
                }
            )
            window.location.replace('/profile'); 
        }
        else{
            this.setState({failed: true}); 
        }
    }
    render(){
        return(
            <div>
                <Container className='content-container'>
                    <Row>
                        <Col md='12'>
                            <p className="mb-0">New Address</p>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            {(this.state.failed) ?
                            <Alert color="danger">
                                Failed to add new address! Try again. 
                            </Alert>
                            : "" 
                            }
                            <Form>
                                <FormGroup>
                                    <Label for="streetLabel">Street</Label>
                                    <Input size='sm' type="text" onChange={this.handleFormChanges} name="street" id="streetLabel" placeholder="Enter your streetname" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="streetNumberLabel">Streetnumber</Label>
                                    <Input size='sm' type="text" onChange={this.handleFormChanges} name="streetNumber" id="streetNumberLabel" placeholder="Enter your streetnumber" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="zipcodeLabel">Zipcode</Label>
                                    <Input size='sm' type="text" onChange={this.handleFormChanges} name="zipcode" id="zipcodeLabel" placeholder="Enter your zipcode" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cityLabel">City</Label>
                                    <Input size='sm' type="text" onChange={this.handleFormChanges} name="city" id="cityLabel" placeholder="Enter your city" />
                                </FormGroup>
                                <Button size='sm' color='secondary' onClick={this.handleSubmit}>Add</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default UserAddress; 