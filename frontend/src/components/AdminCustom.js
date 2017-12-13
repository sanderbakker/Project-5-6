import React, {Component} from 'react';
import {Col, Row} from 'reactstrap'; 
import Loading from './Loading.js';
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';
import CustomCard from './CustomCard.js'; 


class AdminCustom extends Component{
    constructor(props){
        super(props);
        this.state = {fetching: false}
    }
    render(){
        if(this.state.fetching){
            return(
                <Col md={10}>
                    <Loading />
                </Col>
            )
        }
        return (
            <Col md={{size: 10}}>
                <Row className="margin-top-row">
                    <CustomCard/>
                </Row>
            <Row>
                <Col md={12}>
                    <div className='float-right'>
                        {/* <UltimatePagination 
                            currentPage={this.state.page} 
                            totalPages={this.state.total} 
                            onChange={this.onPageChange}
                        /> */}
                    </div>
                </Col>
            </Row> 
        </Col> 
        )
    }
}

export default AdminCustom; 