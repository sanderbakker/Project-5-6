import React, {Component} from 'react'; 
import {Row, Container, Form, FormGroup, Col, Label, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom'; 
import '../css/Login.css'; 

class Register extends Component{
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
                                <FormGroup>
                                    <Label for="exampleInputEmail1">Email address</Label>
                                    <Input size="sm" type="email" className="form-control col-md-6" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input size="sm" type="password" className="form-control col-md-6" id="password" placeholder="Password"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="repeatPassword">Repeat password</Label>
                                    <Input size="sm" type="password" className="form-control col-md-6" id="repeatPassword" placeholder="Repeat password"/>
                                </FormGroup>
                                <Button size="sm" color='secondary' type="submit">Create account</Button>
                                <br></br>
                                <br></br>
                                <small>
                                    <Link exact to='/login'>
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