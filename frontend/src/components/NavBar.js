import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react'; 
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Button, Form, FormGroup, Input } from 'reactstrap';
import {NavLink} from 'react-router-dom'; 
import '../css/NavBar.css'; 
import logo from '../assets/logo-white.png'; 




class NavBar extends Component {
    constructor(props) {
        super(props);
    
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
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
                <Navbar color="faded" light expand="md">
                    <NavLink className='navbar-brand' excat to='/cart'>
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
                            <NavItem>
                                {/* <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink> */}
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
                                <NavLink className='nav-link' excat to='/cart'>
                                    <i className='fa fa-shopping-cart'></i>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' exact to='/login'>
                                    <i className='fa fa-sign-in'></i>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;
