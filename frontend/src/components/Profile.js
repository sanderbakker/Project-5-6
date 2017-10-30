import React, {Component} from 'react'; 
import jwt_decode from 'jwt-decode'; 
import {Card, CardBody, Table, Col, Container, Row, Button} from 'reactstrap'; 
import {Link} from 'react-router-dom'; 
import {User} from '../classes/API/User.js'; 
import '../css/Profile.css'; 
import logo from '../assets/logo.png'; 
import UserAddressCard from './UserAddressCard.js'; 

class Profile extends Component {
    constructor(props){
        super(props);
        this.id = jwt_decode(sessionStorage.getItem('id_token'))['id'];
        this.getUserData = this.getUserData.bind(this);
        this.getUserAddresses = this.getUserAddresses.bind(this); 
        this.createUserAddressCards = this.createUserAddressCards.bind(this); 
        this.state = {}   
    } 

    componentWillMount(){
        this.getUserData(this.id);
        this.getUserAddresses(this.id);  
    }

    getUserData(_id){
       var user = new User(); 
       var userPromise = user.user_data(_id);
       userPromise.then(
           (val) => { 
               this.setState({email: val.email,
                              firstName: val.firstName,
                              lastName: val.lastName});  
           }
       )        
    }

    getUserAddresses(_id){
        var user = new User(); 
        var addresses_promise = user.get_addresses(_id); 
        addresses_promise.then(
            (val) => {
                this.setState({addresses: val}, function(){
                    this.createUserAddressCards(this.state.addresses); 
                }); 
            }
        )
    }
    createUserAddressCards(_addresses){
        var addresCards = [];
        for (var i=0; i < _addresses.length; i++) {
            addresCards.push(
                <UserAddressCard 
                    street={_addresses[i]['street']} 
                    streetNumber={_addresses[i]['streetNumber']}
                    city={_addresses[i]['city']}
                    zipcode={_addresses[i]['zipCode']} 
                />);
        }
        this.setState({cards: addresCards});
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
                                        <Col className="card-row" md={12}>
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
                                            
                                            <Link exact to='profile/add/address' params={this.id}>
                                            <Button className='float-right' size='sm' color='success'>
                                                <i className="fa fa-plus">
                                                </i>
                                            </Button>
                                            </Link>
                                        </Col>
                                        <Col className='card-row' md={12}>
                                            <Row>
                                            {this.state.cards}
                                            </Row>
                                        </Col>
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