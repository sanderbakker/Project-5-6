import React, {Component} from 'react';
import AdminSideBar from './AdminSideBar.js'; 
import {Row, Col, Container} from 'reactstrap'; 
import AdminProducts from './AdminProducts.js'; 
import AdminUsers from './AdminUsers.js';
import AdminOrders from './AdminOrders.js'; 

class Admin extends Component {
    render(){
        return(
            <Container fluid={true} className="content-container">
                <Row>
                    <Col className="full-height" md={2}>
                        <AdminSideBar />                        
                    </Col>
                        {this.props.type === 'default' ? 
                            'default component'
                            : this.props.type === 'products' ? <AdminProducts/>
                            : this.props.type === 'orders' ? <AdminOrders/>
                            : this.props.type === 'users' ? <AdminUsers/>
                            : ''
                        }
                    
                </Row>
            </Container>
        )
    }
}
export default Admin; 