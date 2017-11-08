import React, {Component} from 'react';
import AdminSideBar from './AdminSideBar.js'; 
import {Row, Col, Container} from 'reactstrap'; 
import AdminProducts from './AdminProducts.js'; 

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
                            : this.props.type === 'stats' ? 'stats component'
                            : this.props.type === 'users' ? 'user component' 
                            : ''
                        }
                    
                </Row>
            </Container>
        )
    }
}
export default Admin; 