import React, {Component} from 'react';
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT} from '../chat-server/Events.js'
import ChatLogin from './ChatLogin'
import ChatContainer from './ChatContainer'
import ChatSideBar from './ChatSideBar'

const socketUrl = "http://localhost:3231" 

export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
            socket: null,
            user: null
        }
    }

    componentWillMount() {
        this.initSocket()
    }

    initSocket = ()=>{
        const socket = io(socketUrl)
        socket.on('connect', ()=>{
            console.log("Connected");
        })
        this.setState({socket})
    }

    setUser = (user)=>{
        const {socket} = this.state
        socket.emit(USER_CONNECTED, user);
        this.setState({user})
    }

    logout = ()=>{
		const { socket } = this.state
		socket.emit(LOGOUT)
		this.setState({user:null})
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
        const { title } = this.props
        const { socket, user } = this.state
        return (
            <div className={"chatbox"} >
                <div onClick={f => this.toggle()} className={"chatbox-header"}>
                    <i className={"fa  fa-commenting-o"}></i><span> Live chat</span>
                </div>
                    <div id="chatbox-toggle" className={"chatbox-content display-none"}>
                    {
                        !user ?
                        <ChatLogin socket={socket} setUser={this.setUser} />
                        :
                        <ChatContainer socket={socket} user={user} logout={this.logout} />
                    }
                    </div>
            </div>
        );
    }
}