import React, {Component} from 'react';
import {Col, Table, Button, ButtonGroup} from 'reactstrap'; 
import Loading from './Loading.js';
import {User} from '../classes/API/User.js'; 
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';

class AdminUsers extends Component{
    constructor(props){
        super(props); 
        this.state = {fetching: true, page: 1}
        this.user = new User(); 
        this.getAmountOfUsers = this.getAmountOfUsers.bind(this); 
        this.calculateNumberOfPages = this.calculateNumberOfPages.bind(this); 
        this.onPageChange =  this.onPageChange.bind(this); 
    }

    componentDidMount(){
        this.getAmountOfUsers(); 
    }

    getAmountOfUsers(){
        this.user.getAmountOfUsers().then(
            (val) => 
            this.calculateNumberOfPages(val)
        );
    }

    calculateNumberOfPages(_total_users){
        setTimeout( () => {
        this.setState({total: Math.ceil(_total_users/10)}, () => {
                            this.user.getUsersPaginated(1).then(
                    (val) => this.setState({users: val,  fetching: false}) 
                )
        })}, 1000);  
    }
  
    onPageChange(page) {
        this.user.getUsersPaginated(page).then(
            (val) => this.setState({page: page, users: val})
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
            <Col md={10}>
                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((item, i) => {
                        return <tr>
                                {
                                    item.firstName != null ? <td>{item.firstName}</td> 
                                    : <td>Not filled in</td> 
                                }
                                {
                                    item.lastName != null ? <td>{item.lastName}</td>
                                    : <td>Not filled in</td>
                                }
                                    <td>{item.email}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button color="warning" size="sm"><i className="fa fa-edit"></i></Button>
                                            <Button color="danger" size="sm"><i className="fa fa-minus"></i></Button>
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