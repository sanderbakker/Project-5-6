import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react'; 
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Button, Form, FormGroup, Input } from 'reactstrap';
import {NavLink} from 'react-router-dom'; 
import logo from '../assets/logo-white.png'; 




class NavBar extends Component {
    constructor(props) {
        super(props);
        this.loggedIn = this.props.loggedIn; 
        this.admin = this.props.admin; 
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        }; 
    }
    
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }
    
    render(){
        return(
            <div>
                <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'/>
                <Navbar color="faded" light expand="md">
                    <NavLink className='navbar-brand' exact to='/'>
                        <img src={logo} alt='Brand' width='35px' height='35px'/>
                    </NavLink>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink className='nav-link' exact to='/categories'>
                                    Categories
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className='mx-auto' navbar>
                            <Form inline>
                                <FormGroup>
                                    <Input size='sm' type="text" name="search" placeholder="Search" />
                                </FormGroup>
                                <Button size='sm'><i className='fa fa-search'></i></Button>
                            </Form>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                        
                            <NavItem>
                                <NavLink className='nav-link' exact to='/cart'>
                                    <i className='fa fa-shopping-cart'></i>
                                </NavLink>
                            </NavItem>
                            {(this.admin) ?
                            <NavItem>
                                <NavLink className='nav-link' exact to='/admin'>
                                    <i className='fa fa-cog'></i>
                                </NavLink>
                            </NavItem>
                            : null }

                            {(this.loggedIn) ?
                            <NavItem>
                                <NavLink className='nav-link' exact to='/profile'>
                                    <i className='fa fa-user'></i> 
                                </NavLink>
                            </NavItem>
                            : null }

                            {(this.loggedIn) ?
                            
                            <NavItem>
                                <NavLink className='nav-link' exact to='/logout'>
                                    <i className='fa fa-sign-out'></i>
                                </NavLink>
                            </NavItem>
                            : 
                            <NavItem>
                                <NavLink className='nav-link' exact to='/login'>
                                    <i className='fa fa-sign-in'></i>
                                </NavLink>
                            </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;
