import React, {Component} from 'react'; 
import {Col, Container, Row, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import jwt_decode from 'jwt-decode'; 
import {Link} from 'react-router-dom'; 
import {User} from '../classes/API/User.js';

class UserEdit extends Component{
    constructor(props){
        super(props)
        this.state = {name: '', surname: '', email: ''}
        this.id = jwt_decode(sessionStorage.getItem('id_token'))['id']; 
        this.handleFormChanges = this.handleFormChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.user = new User(); 
    }
    componentWillMount(){
        this.user.user_data(this.id)
        .then(
            (val) => { 
                this.setState({email: val.email,
                               name: val.firstName,
                               surname: val.lastName});  
            }
        )
    }

    getUserData(_id){
                
     }
    
    handleFormChanges(e){
        if(e.target.name === 'name'){
            this.setState({name: e.target.value});
        }
        else if(e.target.name === 'surname'){
            this.setState({surname: e.target.value});
        }
    }

    handleSubmit(){
        this.user.update_user_profile(this.id, this.state.name, this.state.surname).then(
            (val) => {
                if(val.ok && val.status === 204){
                    this.setState({faled: false}); 
                }
                else{
                    this.setState({failed: true}); 
                }
            }
        );
    }

    render(){
        return(
            <Container className="content-container">
                <Row>
                        <Col md='12'>
                            <p className="mb-0">Update user profile</p>
                            <hr></hr>
                        </Col>
                    </Row>
                <Row>
                    <Col md={6}>
                    {this.state.failed ?    
                        <Alert color="danger">
                            Failed to update user profile! Try again. 
                        </Alert> 
                    : null 
                    }
                    <Form>
                        <FormGroup>
                            <Label for="nameLabel">Name</Label>
                            <Input 
                                size='sm' 
                                type="text" 
                                onChange={this.handleFormChanges} 
                                name="name" 
                                id="nameLabel" 
                                placeholder="Enter your name" 
                                value={this.state.name}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="surnameLabel">Surname</Label>
                            <Input 
                                size='sm' 
                                type="text" 
                                onChange={this.handleFormChanges} 
                                name="surname" 
                                id="surnameLabel" 
                                placeholder="Enter your surname"
                                value={this.state.surname} />
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="emailLabel">Email</Label>
                            <Input 
                                size='sm' 
                                type="text" 
                                onChange={this.handleFormChanges} 
                                name="zipcode" id="zipcodeLabel" 
                                placeholder="Enter your zipcode"
                                value={this.state.zipcode} />
                        </FormGroup> */}
                        <Button size='sm' color='secondary' onClick={this.handleSubmit}>Update</Button>
                        <Link to='/profile'>
                            <Button size='sm' className='float-right' color='danger'>Return to profile</Button>
                        </Link>
                    </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default UserEdit; 