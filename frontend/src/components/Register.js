import React, {Component} from 'react'; 
import {Row, Container, Form, FormGroup, Col, Label, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Account} from '../classes/API/Account';

import Message from './Message.js';


class Register extends Component{
    constructor(props){
        super(props);
        this.state = {email: '', password: '', rePassword: ''};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);  
    }
    
    handleEmailChange(e){
        this.setState({email: e.target.value}); 
    }

    handleRepeatPasswordChange(e){
        this.setState({rePassword: e.target.value});
    }
    
    handlePasswordChange(e){
        this.setState({password: e.target.value}); 
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.password === this.state.rePassword){
            let account = new Account();             
            let accountPromise = account.register(this.state.email, this.state.password);
            accountPromise.then(
                (val) => {
                    if(typeof val.access_token !== 'undefined') {
                        this.setState({
                            issetMessage: true, 
                            message: 'Account created successfully', 
                            messageType: 'success'
                        });                    
                    } else {
                        this.setState({
                            issetMessage: true, 
                            message: val, 
                            messageType: 'danger'
                        });
                    }
                 });            
        } else{
            this.setState({
                issetMessage: true,
                message: "Passwords don't match try again",
                messageType: 'danger'
            });
        }
    }

    render(){
        return(
            <div>
                <Container className="content-container">
                    <Row>
                        <Col md="12">
                            <p className="mb-0">Create account</p>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{size: 6, offset: 1}}>
                            <Form className="mx-auto">
                                {(this.state.issetMessage) ? <Message type={this.state.messageType} message={this.state.message} /> : null }                                                        
                                <FormGroup>
                                    <Label for="exampleInputEmail1">Email address</Label>
                                    <Input size="sm" type="email" onChange={this.handleEmailChange} className="form-control col-md-6" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input size="sm" type="password" onChange={this.handlePasswordChange} className="form-control col-md-6" id="password" placeholder="Password"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="repeatPassword">Repeat password</Label>
                                    <Input size="sm" type="password" onChange={this.handleRepeatPasswordChange} className="form-control col-md-6" id="repeatPassword" placeholder="Repeat password"/>
                                </FormGroup>
                                <Button size="sm" color='secondary' onClick={this.handleSubmit} type="submit">Create account</Button>
                                <br></br>
                                <br></br>
                                <small>
                                    <Link to='/login'>
                                        <i className="fa fa-arrow-right"></i> Already have an account? Login
                                    </Link>
                                </small>
                            </Form>
                        </Col>
                        <Col md="4">
                            <p>Reasons to create a account:</p>
                            <ul>
                                <li><i className="fa fa-check check-green"></i> Order products faster</li>
                                <li><i className="fa fa-check check-green"></i> Show order history</li>
                                <li><i className="fa fa-check check-green"></i> Use your shopping cart everywhere</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Register;