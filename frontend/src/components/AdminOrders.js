import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import OrderOverview from './OrderOverview.js'; 

class AdminOrders extends Component {
    render() {
        return (
            <Row>
             <Col md={12}>            
                <OrderOverview admin={true} />
             </Col>
            </Row>
        );
    }

}

export default AdminOrders;
    