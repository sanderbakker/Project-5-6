import React, {Component} from 'react';
import {Button} from 'reactstrap';

class Logout extends Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this); 
    }

    handleLogout(){
        sessionStorage.clear();
        window.location.replace('/'); 
    }

    render(){
        return(
            <div>
              <Button color='secondary' onClick={this.handleLogout}></Button>   
            </div>
        )
    }
}
export default Logout; 