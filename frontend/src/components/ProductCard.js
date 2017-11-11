import React, {Component} from 'react'; 
import {Card, Col, CardBody, CardImg, CardSubtitle, CardText, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'; 
import {Link} from 'react-router-dom';

class ProductCard extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    render(){
        return(
            <Col md={4}>
                
                    <Card>
                        <Link to={'/product/' + this.props.id }>
                            <CardImg top width="100%" height='130px' src="http://via.placeholder.com/300x130" alt="Placeholder image" />
                        </Link>   
                        <CardBody>
                            <CardSubtitle><b>{this.props.name}</b>
                            {this.props.admin ? 
                                <Dropdown className="float-right" size={"sm"}isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle 
                                        tag="span"
                                        onClick={this.toggle}
                                        data-toggle="dropdown"
                                        aria-expanded={this.state.dropdownOpen}>
                                        <i className="fa fa-cog"/>
                                    </DropdownToggle>
                                    <DropdownMenu right>

                                    <Link to={'/admin/edit/product/' + this.props.id}>
                                        <DropdownItem>
                                                Edit
                                        </DropdownItem>
                                    </Link>

                                    <DropdownItem onClick={() => {if(window.confirm('Delete this item?')) this.props.delete(this.props.id)}}>
                                            Delete
                                    </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            : "" }
                            </CardSubtitle>
                            <hr className="hr-margin-bottom"/>
                            <CardText>  
                                <i>Price: € {this.props.price.toLocaleString(
                                                    undefined,
                                                    { minimumFractionDigits: 2 }
                                                    )},-</i>
                                <br/>  
                                
                                {this.props.description}
                            </CardText>
                            <Button size="sm" color="success" className="float-right line-height-edit">
                                <i className="fa fa-shopping-cart"/>
                            </Button>
                        </CardBody>
                    </Card>
          
            </Col>
        )
    }
}
export default ProductCard; 