import React, {Component} from 'react';
import {ListGroupItem, ListGroup} from 'reactstrap';
import {Link} from 'react-router-dom'; 
import '../css/AdminSideBar.css'; 

class AdminSideBar extends Component{
    render(){
        return(
            <ListGroup>
                <ListGroupItem>
                    <Link to={'/'}>
                        <i className={"fa fa-desktop"}></i> Products
                    </Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to={'/'}>
                        <i className={"fa fa-user"}></i> Users
                    </Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to={'/'}>
                        <i className={"fa fa-pie-chart"}></i> Statistics
                    </Link>
                </ListGroupItem>
            </ListGroup>
        )
    }
}

export default AdminSideBar; 