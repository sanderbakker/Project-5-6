import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 
import {Row, Col, Container, Form, Input, Label, FormGroup, Button} from 'reactstrap'; 
import '../css/Login.css'; 

class Login extends Component{
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
                                    <Input size='sm' type="email" className="form-control col-md-6" id="inputMail" required placeholder="Enter email"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="inputPassword">Password</Label>
                                    <Input size='sm' type="password" required className="form-control col-md-6" id="inputPassword" placeholder="Password"/>
                                </FormGroup>
                                <Button color='secondary' type="submit" size='sm'>Login</Button>
                                <br></br>
                                <br></br>
                                <small>
                                    <Link exact to='/'>
                                    <i class="fa fa-arrow-right"></i> Forgot email
                                    </Link>
                                </small>
                                <br></br>
                                <small>
                                    <Link exact to='/'>
                                        <i class="fa fa-arrow-right"></i> Forgot password
                                    </Link>
                                </small>
                            </Form>
                        </Col>
                        <Col md="5">
                            <p>Reasons to create a account:</p>
                            <ul>
                                <li><i class="fa fa-check check-green"></i> Order products faster</li>
                                <li><i class="fa fa-check check-green"></i> Show order history</li>
                                <li><i class="fa fa-check check-green"></i> Use your shopping cart everywhere</li>
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