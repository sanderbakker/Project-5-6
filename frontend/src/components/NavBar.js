import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react'; 
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Button, Form, FormGroup, Input } from 'reactstrap';
import {NavLink} from 'react-router-dom'; 
import logo from '../assets/logo-white.png'; 
import {Products} from '../classes/API/Products.js';  


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.loggedIn = this.props.loggedIn; 
        this.admin = this.props.admin; 
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        }; 
        this.products = new Products();
    }

    componentDidMount() {
        this.products.getCategories().then(
            (val) => {
                this.setState({categories: val}); 
            }
        );         
    }
    
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    handleSearchForm(e) {
        e.preventDefault();
        var searchString = (document.getElementById("search").value);
        window.location.replace("/search/" + searchString);
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
                            <Form onSubmit={this.handleSearchForm} action="" method="get" inline>
                                <FormGroup>
                                    <Input size='sm' type="text" id="search" name="search" placeholder="Search" list="suggestions" />
                                        <datalist id="suggestions">                                    
                                        {this.state.categories && this.state.categories.map(function(item, i){  
                                                return <option  key={item} value={item} />
                                        })}
                                        </datalist> 
                                </FormGroup>
                                <Button size='sm'><i className='fa fa-search'></i></Button>
                            </Form>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            {(this.admin) ? 
                            <NavItem>
                                <NavLink className='nav-link' exact to='/cart'>
                                    <i className='fa fa-shopping-cart'></i>
                                </NavLink>
                            </NavItem>
                            : null}
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
