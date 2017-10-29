import React, {Component} from 'react'; 
import jwt_decode from 'jwt-decode'; 
import {Card, CardBody, Table, Col, Container, Row, Button} from 'reactstrap'; 
import {Account} from '../classes/API/Account.js'; 
import '../css/Profile.css'; 
import logo from '../assets/logo.png'; 

class Profile extends Component {
    constructor(props){
        super(props);
        this.id = jwt_decode(sessionStorage.getItem('id_token'))['id'];
        this.getUserData = this.getUserData.bind(this);
        this.getUserData(this.id);
        this.state = {}
        console.log(this.data);   
    } 

    getUserData(_id){
       var account = new Account(); 
       var accountPromise = account.user_data(_id);
       accountPromise.then(
           (val) => { 
               console.log(val);
               this.setState({email: val.email,
                              firstName: val.firstName,
                              lastName: val.lastName});  
           }
       )        
    }
    render(){
        return(
            <div>
                <Container className='content-container'>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md={12}>
                                            <Button className='float-right' color='secondary' size='sm'>
                                                <i className='fa fa-pencil'></i>
                                            </Button>
                                        </Col>
                                        <Col md={12}>
                                            <img className='profileImage'  alt='Profile' src={logo} width={150} height={150}/>
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>{this.state.firstName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Surname</th>
                                                        <td>{this.state.lastName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{this.state.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Password</th>
                                                        <td>********</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md={12}>
                                            <Button className='float-right' size='sm' color='success'>
                                                <i class="fa fa-plus">
                                                </i>
                                            </Button>
                                        </Col>
                                        [Here comes a foreach loop fetching all the UserAddress, visualizing them as one card per address, with an remove and edit button]
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Profile; 