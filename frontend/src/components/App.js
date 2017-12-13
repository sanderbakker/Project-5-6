import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar.js'; 
import Categories from './Categories.js';
import SearchResult from './SearchResult.js';
import Home from './Home.js'; 
import NotFound from './NotFound.js'; 
import Footer from './Footer.js'; 
import Login from './Login.js'; 
import Register from './Register.js'; 
import Logout from './Logout.js'; 
import Profile from './Profile.js';
import UserAddress from './UserAddress.js'; 
import ChatBox from './ChatBox.js'; 
import jwt_decode from 'jwt-decode'; 
import CategoryProducts from './CategoryProducts.js';
import {PropsRoute} from 'react-router-with-props'; 

import in_array from 'in-array';
import Admin from './Admin.js'; 
import UserEdit from './UserEdit.js'; 
import AdminProductFrom from './AdminProductForm.js'; 
import Product from './Product.js';
import AdminUserForm from './AdminUserForm.js'; 
import ShoppingCart from './ShoppingCart.js';
import Order from './Order.js';

import '../css/style.css'; 

  
class App extends Component {
  constructor(props){
    super(props);
    this.state = {admin: false, loggedIn: false}; 
    this.roles = null;
    this.handleLogout = this.handleLogout.bind(this); 
  }

  async handleLogout(){
    sessionStorage.clear();  
    window.location.replace('/login'); 
  }

  componentWillMount(){
      if(sessionStorage.getItem('access_token') != null && sessionStorage.getItem('id_token') != null){
          this.setState({loggedIn: true}); 
          if(in_array(jwt_decode(sessionStorage.getItem('id_token'))['roles'], 'Administrator')){
            this.setState({admin: true}); 
          }
          else{
            this.setState({admin: false}); 
          }
      }
      else{
          this.setState({loggedIn: false}); 
      } 
  }
  render() {
    return (
        <BrowserRouter>
          <div>
            <title>Webshop</title> 
            <NavBar admin={this.state.admin} loggedIn={this.state.loggedIn} />
            <Switch>
                    {/*Routes need to be include in App.js otherwise root can't find the paths*/}
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/categories' component={Categories}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/search/:search' component={SearchResult}/>
                    
                    {/* Renders routes for our categories */}
                    
                    <Route exact path='/categories/:category' component={CategoryProducts}/>

                    {(this.state.loggedIn) ? 
                    <Route exact path='/logout' render={(props) => (<Logout logOutHandler={this.handleLogout} {...props}/>)} />                    
                    : null}
                    {(this.state.loggedIn) ? 
                    <Route exact path='/profile' component={Profile} />
                    : null }

                    {(this.state.admin) ? 
                    <Route exact path='/admin' type='default' component={Admin} />
                    : null }

                    {(this.state.admin) ?
                    <PropsRoute action='edit' exact path='/admin/edit/user/:id' component={AdminUserForm}/>
                    : null}

                    {(this.state.admin) ?
                    <PropsRoute type='products' exact path ='/admin/products/' component={Admin} />
                    : null}

                    {(this.state.admin) ?
                    
                    <PropsRoute type='orders' exact path ='/admin/orders/' component={Admin} />
                    : null}

                    {(this.state.admin) ?
                    <PropsRoute type='custom' exact path ='/admin/customizations/' component={Admin} />
                    : null 
                    }
                    
                    {(this.state.admin) ?
                    <PropsRoute action='add' exact path ='/admin/add/product' component={AdminProductFrom} />
                    : null}

                    {(this.state.admin) ?
                    <PropsRoute action='edit' exact path ='/admin/edit/product/:id' component={AdminProductFrom} />
                    : null}


                    {(this.state.admin) ?
                    <PropsRoute type='users' exact path ='/admin/users/' component={Admin} />
                    : null}



                    {(this.state.loggedIn) ?
                    <PropsRoute action='add' exact path ='/profile/add/address' component={UserAddress} />
                    : null}

                    {(this.state.loggedIn) ?
                    <Route exact path ='/profile/edit/' component={UserEdit} />
                    : null}

                    {(this.state.loggedIn) ?
                    <PropsRoute action='edit' path ='/profile/edit/address/:id' component={UserAddress} />
                    : null}       

                    {(this.state.loggedIn) ?
                    <PropsRoute path='/order' component={Order} />
                    : null }            

                    <Route path='/product/:id' component={Product}/>

                    <Route render={function(){
                        return (<NotFound/>); 
                    }}/>
                </Switch>
                <ChatBox />
              <Footer/>
          </div>  
        </BrowserRouter>
    );
  }
}

export default App;
