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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((item, i) => {
                        return <tr key={i}>
                                {
                                    item.firstName != null ? <td>{item.firstName}</td> 
                                    : <td>Not filled in</td> 
                                }
                                {
                                    item.lastName != null ? <td>{item.lastName}</td>
                                    : <td>Not filled in</td>
                                }
                                    <td>{item.email}</td>
                                    <td>{item.isAdmin}</td>
                                    <td>
                                        <ButtonGroup size="sm">
                                            {/* <Link to={'/admin/edit/user/' + item.id}>
                                                <Button color="warning" size="sm"><i className="fa fa-edit"></i></Button>
                                            </Link> */}
                                            <AdminUserForm user={this.getAmountOfUsers} id={item.id} action="edit"/>
                                            {/* <Button color="danger" size="sm"><i className="fa fa-minus"></i></Button> */}
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