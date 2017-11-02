import React, {Component} from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import jwt_decode from 'jwt-decode'; 
import {User} from '../classes/API/User.js'; 
import {Link} from 'react-router-dom';

class UserAddress extends Component{
    constructor(props){
        super(props); 
        this.state = {street: null, streetNumber: null, zipcode: null, city: null, visible: false}
        this.id = jwt_decode(sessionStorage.getItem('id_token'))['id'];
        this.handleFormChanges = this.handleFormChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.onDismiss = this.onDismiss.bind(this); 
        this.user = new User(); 
    }
    
    componentWillMount(){
        if(this.props.action === 'edit'){
            var getAddresByIdPromise = this.user.get_address_by_id(this.id, this.props.match.params.id);
            getAddresByIdPromise.then(
                (val) => {
                    console.log(val); 
                }
            )
        }
    }
    onDismiss(){
        this.setState({visible: false}); 
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
        if(this.state.zipcode !== null && this.state.street !== null && this.state.streetNumber !== null && this.state.city !== null){
            if(this.props.action === 'add'){
                var add_address_promise = this.user.add_address(this.state.street, this.state.streetNumber, this.state.city, this.state.zipcode, this.id);
                add_address_promise.then(
                    (val) => {
                        if(val.constructor !== Array){
                            this.setState({failed: true}); 
                        }
                        this.setState({visible: true}); 
                    }
                )
            }
            else if(this.props.action === 'edit'){

            }
        }
        else{
            this.setState({failed: true}); 
        }
        
    }
    render(){
        return(
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
                            : (this.state.visible) ?<Alert isOpen={this.state.visible} toggle={this.onDismiss} color='success'>Added address to your profile</Alert> 
                            : ""
                            }
                            <Form>
                                <FormGroup>
                                    <Label for="streetLabel">Street</Label>
                                    <Input 
                                        size='sm' 
                                        type="text" 
                                        onChange={this.handleFormChanges} 
                                        name="street" 
                                        id="streetLabel" 
                                        placeholder="Enter your streetname" 
                                        value={this.state.street}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="streetNumberLabel">Streetnumber</Label>
                                    <Input 
                                        size='sm' 
                                        type="text" 
                                        onChange={this.handleFormChanges} 
                                        name="streetNumber" 
                                        id="streetNumberLabel" 
                                        placeholder="Enter your streetnumber"
                                        value={this.state.streetNumber} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="zipcodeLabel">Zipcode</Label>
                                    <Input 
                                        size='sm' 
                                        type="text" 
                                        onChange={this.handleFormChanges} 
                                        name="zipcode" id="zipcodeLabel" 
                                        placeholder="Enter your zipcode"
                                        value={this.state.zipcode} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cityLabel">City</Label>
                                    <Input 
                                        size='sm' 
                                        type="text" 
                                        onChange={this.handleFormChanges} 
                                        name="city" 
                                        id="cityLabel" 
                                        placeholder="Enter your city"
                                        value={this.state.city} />
                                </FormGroup>
                                <Button size='sm' color='secondary' onClick={this.handleSubmit}>Add</Button>
                                <Link exact to='/profile'>
                                    <Button size='sm' className='float-right' color='danger'>Return to profile</Button>
                                </Link>
                            </Form>
                        </Col>
                    </Row>
                </Container>
        )
    }
}
export default UserAddress; 