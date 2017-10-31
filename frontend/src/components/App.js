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


  
class App extends Component {
  constructor(props){
    super(props);
    this.state = {};  
    this.handleLogout = this.handleLogout.bind(this); 
  }

  handleLogout(){
    sessionStorage.clear(); 
    window.location.replace('/login'); 
  }

  componentWillMount(){
      if(sessionStorage.getItem('access_token') != null && sessionStorage.getItem('id_token') != null){
          this.setState({loggedIn: true}); 
          console.log(sessionStorage.getItem('id_token')); 
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
            <NavBar loggedIn={this.state.loggedIn} />
            <Switch>
                    {/*Routes need to be include in App.js otherwise root can't find the paths*/}
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/categories' component={Categories}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>

                    {(this.state.loggedIn) ? 
                    <Route exact path='/logout' render={(props) => (<Logout logOutHandler={this.handleLogout} {...props}/>)} />                    
                    : null}
                  
                    {(this.state.loggedIn) ? 
                    <Route exact path='/profile' component={Profile} />
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
