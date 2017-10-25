import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 
import {Row, Col, Container, Form, Input, Label, FormGroup, Button} from 'reactstrap'; 
import '../css/Login.css'; 



class Login extends Component{
    constructor(props){
        super(props); 
        this.state = {email: '', password: ''}
        this.handleEmailChange = this.handleEmailChange.bind(this); 
        this.handlePasswordChange = this.handlePasswordChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleEmailChange(e){
        this.setState({email: e.target.value}) 
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault(); 
        console.log(this.state.email, this.state.password); 
        // MAKE API CALL HERE TO VALIDATE DATA; 
        
    }

    render(){
        return(
            <div>
                <Container className='content-container'>
                    <Row>
                        <Col md='6'>
                            <p className="mb-0">Login</p>
                            <hr></hr>
                        </Col>
                        <Col md='6'>
                            <p className="mb-0">New Customer</p>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row className="margin-row">
                        <Col md={{size: 6, offset: 1}} >
                            <Form className="mx-auto">
                                <FormGroup>
                                    <Label for="inputMail">Email address</Label>
                                    <Input size='sm' onChange={this.handleEmailChange} type="email" className="form-control col-md-6" id="inputMail" required placeholder="Enter email"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="inputPassword">Password</Label>
                                    <Input size='sm' onChange={this.handlePasswordChange} type="password" required className="form-control col-md-6" id="inputPassword" placeholder="Password"/>
                                </FormGroup>
                                <Button color='secondary' size='sm' onClick={this.handleSubmit}>Login</Button>
                                <br></br>
                                <br></br>
                                <small>
                                    <Link exact to='/'>
                                        <i className="fa fa-arrow-right"></i> Forgot email
                                    </Link>
                                </small>
                                <br></br>
                                <small>
                                    <Link exact to='/'>
                                        <i className="fa fa-arrow-right"></i> Forgot password
                                    </Link>
                                </small>
                            </Form>
                        </Col>
                        <Col md="5">
                            <p>Reasons to create a account:</p>
                            <ul>
                                <li><i className="fa fa-check check-green"></i> Order products faster</li>
                                <li><i className="fa fa-check check-green"></i> Show order history</li>
                                <li><i className="fa fa-check check-green"></i> Use your shopping cart everywhere</li>
                            </ul>
                            <Link exact to = '/register'>
                                <Button size='sm' color='secondary'>Register Now!</Button> 
                            </Link> 
                        </Col>
                    </Row>
                </Container>
            </div>
        ); 
    }
}
export default Login;