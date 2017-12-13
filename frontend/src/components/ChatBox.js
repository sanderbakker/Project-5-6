import React, {Component} from 'react';


export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false
        }
    }

    toggle() {
        var content = document.getElementById("chatbox-toggle");
        if(this.state.toggled === false) {
            content.classList.remove("display-none");            
            this.setState({toggled: true});
        } else {
            content.classList.add("display-none");            
            this.setState({toggled: false});
        }
    }

    render() {
        return (
            <div className={"chatbox"} >
               <div onClick={f => this.toggle()} className={"chatbox-header"}>
                   <i className={"fa  fa-commenting-o"}></i><span> Live chat</span>
               </div>
               <div id="chatbox-toggle" className={"chatbox-content display-none"}>
                    
               </div>
            </div>
        );
    }
}
