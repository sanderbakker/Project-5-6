import React, {Component} from 'react'
import {Card, CardTitle, CardSubtitle, CardBody, Col, CardText, ButtonGroup} from 'reactstrap'
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
                        <CardTitle>
                            {this.props.name}
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted">
                            € {this.props.price} ,- 
                        </CardSubtitle>
                        <CardText>
                            {this.props.description}
                        </CardText>
                        <ButtonGroup size="sm" className="float-right ">
                            {this.props.admin ? 
                            <AdminCustomForm id={this.props.id} highlight={this.highlightItem} customization={this.props.updateCustom} action="edit">Edit</AdminCustomForm>
                            : ""}  
                        </ButtonGroup>   
                    </CardBody>
                </Card>
            </Col>
        );
    }
}
export default CustomCard; 