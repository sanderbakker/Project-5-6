import React, {Component} from 'react';
import {Col, Row} from 'reactstrap'; 
import Loading from './Loading.js';
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';
import CustomCard from './CustomCard.js'; 
import AdminCustomForm from './AdminCustomForm.js';
import { Products } from '../classes/API/Products';


class AdminCustom extends Component{
    constructor(props){
        super(props);
        this.state = {fetching: true, page: 1, customizations: null}
        this.product = new Products(); 
        this.getAmountOfCustomizations = this.getAmountOfCustomizations.bind(this); 
        this.calculateNumberOfPages = this.calculateNumberOfPages.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }
    
    componentDidMount(){
        this.getAmountOfCustomizations(); 
    }

    getAmountOfCustomizations(){ 
        this.product.getAmountCustomizations().then(
            (val) => {this.calculateNumberOfPages(val)
             }
        );
    }

    calculateNumberOfPages(_total_customizations){
        setTimeout( () => {
        this.setState({total: Math.ceil(_total_customizations/9)}, () => {
            
            this.product.getCustomizations(this.state.page).then(
                (val) => {
                    if(val.length !== 0){
                            this.setState({customizations: val, fetching: false}) 
                        }
                    else{
                        this.setState({customizations: null, fetching: false, total: 1})
                    }
                } 
            )
            
           
        })}, 1000);  
    }
  
    onPageChange(page) {
        this.product.getCustomizations(page).then(
            (val) => this.setState({page: page, customizations: val})
        )
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
                <Row>
                    <Col md={12}>
                        <AdminCustomForm action="add" updateCustom={this.getAmountOfCustomizations}/>
                    </Col>
                </Row>
                <Row className="margin-top-row">  
                    {this.state.customizations && this.state.customizations.map((item, i) => {
                            return <CustomCard 
                                        key={i}
                                        id={item.id}
                                        description={item.description}
                                        name={item.name}
                                        price={item.price}
                                        admin={true}
                                        updateCustom={this.getAmountOfCustomizations}
                                    />
                        }
                    )
                    }
                </Row>
            <Row>
                <Col md={12}>
                    <div className='float-right'>
                        <UltimatePagination 
                            currentPage={this.state.page} 
                            totalPages={this.state.total} 
                            onChange={this.onPageChange}
                        />
                    </div>
                </Col>
            </Row> 
        </Col> 
        )
    }
}

export default AdminCustom; 