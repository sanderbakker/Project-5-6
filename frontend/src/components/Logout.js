import React, {Component} from 'react';
import {Button, Card, CardBody, CardText, Col, Container, Row} from 'reactstrap';
import {Link} from 'react-router-dom'; 

import logo from '../assets/logo.png'; 

import '../css/Logout.css'; 

class Logout extends Component{
    constructor(props){
        super(props);
     
        this.handleLogout = this.handleLogout.bind(this); 
        
    }

    handleLogout(){
        sessionStorage.clear();
        window.location.replace('/login'); 
    }

    render(){
        return(
            <div>
                <Container className="content-container">
                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <Card>
                                <CardBody>
                                    <img className="logoutImage" src={logo} width='130' height='130px' alt='Logo'/>
                                    <hr></hr>
                                    <CardText>
                                        Clicking "Logout" will log you out from webshop [NAME]
                                    </CardText>
                                    <Link exact to='/'>
                                    <Button size='sm' className='float-left' color='default'>Cancel</Button>
                                    </Link>
                                    <Button size='sm'className='float-right' color='secondary' onClick={this.handleLogout}>Logout</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                 
            </div>
        )
    }
}
export default Logout; 