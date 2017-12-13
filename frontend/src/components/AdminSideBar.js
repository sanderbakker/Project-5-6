import React, {Component} from 'react';
import {ListGroupItem, ListGroup} from 'reactstrap';
import {Link} from 'react-router-dom'; 

class AdminSideBar extends Component{
    render(){
        return(
            <ListGroup>
                <ListGroupItem>
                    <Link to={'/admin/products'}>
                        <i className={"fa fa-desktop"}></i> Products
                    </Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to={'/admin/users'}>
                        <i className={"fa fa-user"}></i> Users
                    </Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to={'/admin/customizations'}>
                        <i className={"fa fa-gavel"}/> Customizations
                    </Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to={'/admin/orders'}>
                        <i className={"fa fa-pie-chart"}></i> Orders
                    </Link>
                </ListGroupItem>
            </ListGroup>
        )
    }
}

export default AdminSideBar; 