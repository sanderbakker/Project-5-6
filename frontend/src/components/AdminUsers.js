import React, {Component} from 'react';
import {Col, Table, ButtonGroup} from 'reactstrap'; 
import Loading from './Loading.js';
import {User} from '../classes/API/User.js';  
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';
import AdminUserForm from './AdminUserForm.js'; 

class AdminUsers extends Component{
    constructor(props){
        super(props); 
        this.state = {fetching: true, page: 1}
        this.user = new User(); 
        this.getAmountOfUsers = this.getAmountOfUsers.bind(this); 
        this.calculateNumberOfPages = this.calculateNumberOfPages.bind(this); 
        this.onPageChange =  this.onPageChange.bind(this); 
        this.highlightItem = this.highlightItem.bind(this); 
    }

    componentWillMount(){
        this.getAmountOfUsers(); 
    }

    getAmountOfUsers(){
        this.user.getAmountOfUsers().then(
            (val) =>{ 
                this.calculateNumberOfPages(val)
                //this.setState({fetching: true}); 
            }
        );
    }

    calculateNumberOfPages(_total_users){
        setTimeout( () => {
        this.setState({total: Math.ceil(_total_users/10)}, () => {
                            this.user.getUsersPaginated(this.state.page).then(
                    (val) => this.setState({users: val,  fetching: false}) 
                )
        })}, 1000);  
    }
  
    onPageChange(page) {
        this.user.getUsersPaginated(page).then(
            (val) => this.setState({page: page, users: val})
        )
    }
    highlightItem(itemId){
        var item = document.getElementById(itemId);
        item.style.boxShadow =  "10px 0px 78px -13px rgba(44,53,68,1)"; 
        setTimeout(() => {
            item.style.removeProperty("box-shadow")
        }, 750);
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
            <Col md={10}>
                <AdminUserForm user={this.getAmountOfUsers} action='add'/>
                <Table hover={true}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Deleted</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((item, i) => {
                        return <tr key={i} ref={item.id} id={item.id}>
                                {
                                    item.firstName != null ? <td>{item.firstName}</td> 
                                    : <td>Not filled in</td> 
                                }
                                {
                                    item.lastName != null ? <td>{item.lastName}</td>
                                    : <td>Not filled in</td>
                                }
                                    <td>{item.email}</td>
                                    {item.isAdmin ? <td><i className="fa fa-check check"/></td> : <td><i className="fa fa-times cross"/></td>} 
                                    {item.isDisabled ? <td><i className="fa fa-check check"/></td> : <td><i className="fa fa-times cross"/></td>}
                                    <td>
                                        <ButtonGroup size="sm">                                            
                                            <AdminUserForm highlight={this.highlightItem} user={this.getAmountOfUsers} id={item.id} action="edit"/>
                                        </ButtonGroup>
                                    </td>
                              </tr>
                    })}
                    </tbody>
                </Table>
                <div className='float-right'>
                    <UltimatePagination 
                        currentPage={this.state.page} 
                        totalPages={this.state.total} 
                        onChange={this.onPageChange}
                    />
                </div>
            </Col>
        )
    }
}

export default AdminUsers; 