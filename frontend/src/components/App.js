import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar.js'; 
import Categories from './Categories.js';
import Home from './Home.js'; 
import NotFound from './NotFound.js'; 
import Footer from './Footer.js'; 
import Login from './Login.js'; 
import Register from './Register.js'; 
import Logout from './Logout.js'; 
import Profile from './Profile.js';
import UserAddress from './UserAddress.js'; 
import jwt_decode from 'jwt-decode'; 
import {Products} from '../classes/API/Products.js'; 
import CategoryProducts from './CategoryProducts.js';
import {PropsRoute} from 'react-router-with-props'; 

import in_array from 'in-array';
import Admin from './Admin.js'; 

  
class App extends Component {
  constructor(props){
    super(props);
    this.state = {admin: false}; 
    this.roles = null;
    this.handleLogout = this.handleLogout.bind(this); 
    this.getAllCategories = this.getAllCategories.bind(this); 
    this.createProductRoutes = this.createProductRoutes.bind(this); 
  }

  handleLogout(){
    sessionStorage.clear(); 
    window.location.replace('/login'); 
  }

  componentWillMount(){
      this.getAllCategories(); 
      if(sessionStorage.getItem('access_token') != null && sessionStorage.getItem('id_token') != null){
          this.setState({loggedIn: true}); 
          if(in_array(jwt_decode(sessionStorage.getItem('id_token'))['roles'], 'Administrator')){
            this.setState({admin: true}); 
          }
      }
      else{
          this.setState({loggedIn: false}); 
      } 
  }
  getAllCategories(){
      var products = new Products();
      var categories_promise = products.getCategories(); 
      categories_promise.then(
          (val) => {
              this.setState({categories: val}, function(){
                  this.createProductRoutes(this.state.categories); 
              }); 
          }
      );
  }


  createProductRoutes(_categories){
      var routes = [];
      for (var i=0; i < _categories.length; i++) {
          routes.push(
                <PropsRoute exact path={"/categories/" + _categories[i].toLowerCase()} component={CategoryProducts} name={_categories[i]} />
              );
      }
      this.setState({routes: routes});
    
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
                    {/* Renders routes for our categories */}
                    {this.state.routes}

                    {(this.state.loggedIn) ? 
                    <Route exact path='/logout' render={(props) => (<Logout logOutHandler={this.handleLogout} {...props}/>)} />                    
                    : null}
                    {console.log(this.state.admin)}
                    {(this.state.loggedIn) ? 
                    <Route exact path='/profile' component={Profile} />
                    : null }

                    {(this.state.admin) ? 
                    <Route exact path='/admin' component={Admin} />
                    : null }

                    {(this.state.loggedIn) ?
                    <Route exact path ='/profile/add/address' component={UserAddress} />
                    : null}

                    <Route render={function(){
                        return (<NotFound/>); 
                    }}/>
                </Switch>
              <Footer/>
          </div>  
        </BrowserRouter>
    );
  }
}

export default App;
