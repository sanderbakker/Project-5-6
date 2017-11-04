import React, {Component} from 'react';
import AdminSideBar from './AdminSideBar.js'; 
import {Row, Col, Container} from 'reactstrap'; 

class Admin extends Component {
    render(){
        return(
            <Container fluid={true} className="content-container">
            <Row>
                <Col className="full-height" md={2}>
                    <AdminSideBar />
                </Col>
                <Col md={10}>
                
                </Col>
            </Row>
        </Container>
        )
    }
}
export default Admin; 