import React, {Component} from 'react'
import {Card, CardTitle, CardSubtitle, CardBody, Col, CardText, Button, ButtonGroup} from 'reactstrap'
import AdminCustomForm from './AdminCustomForm.js';

class CustomCard extends Component {
    constructor(props){
        super(props);
        this.highlightItem = this.highlightItem.bind(this); 
    }
    highlightItem(itemId){
        var item = document.getElementById(itemId);
        item.style.boxShadow =  "10px 0px 78px -13px rgba(44,53,68,1)"; 
        setTimeout(() => {
            item.style.removeProperty("box-shadow")
        }, 750);
    }
    
    render(){
        return(
            <Col md={4}>
                <Card>
                    <CardBody>
                        <CardTitle id={this.props.size === "small" ? "small-card" : ""}>
                            {this.props.name}
                        </CardTitle>
                        
                        <CardSubtitle id={this.props.size === "small" ? "small-price" : ""} className="mb-2 text-muted">
                            € {this.props.price} ,- 
                        </CardSubtitle>
                        <CardText id={this.props.size === "small" ? "small-desc" : ""}>
                            {this.props.description}
                        </CardText>
                        <ButtonGroup size="sm" className="float-right ">
                            {this.props.admin ? 
                            <AdminCustomForm id={this.props.id} highlight={this.highlightItem} customization={this.props.updateCustom} action="edit">Edit</AdminCustomForm>
                            : ""}  
                            {this.props.product ? 
                            <Button id="small-button" className="pull-right" size={"sm"}><i className="fa fa-plus"/></Button>                             
                            : ""}
                        </ButtonGroup>   
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
export default CustomCard; 