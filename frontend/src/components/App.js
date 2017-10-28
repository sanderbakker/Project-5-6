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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};  
  }
  componentWillMount(){
      if(sessionStorage.getItem('access_token') != null && sessionStorage.getItem('id_token') != null){
          this.setState({loggedIn: true}); 
      } 
  }
  render() {
    return (
        <BrowserRouter>
          <div>
            <title>Webshop</title> 
            <NavBar/>
            <Switch>
                    {/*Routes need to be include in App.js otherwise root can't find the paths*/}
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/categories' component={Categories}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    {(this.state.loggedIn) ? <Route exact path='/logout' component={Logout}/> : null}
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
