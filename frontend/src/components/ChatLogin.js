import React, { Component } from 'react';
import { VERIFY_USER } from '../chat-server/Events'

export default class LoginForm extends Component {
	
	constructor(props) {
	    super(props);
	    this.state = { nickname: "", error:"" };

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.setUser = this.setUser.bind(this);
	}

	componentDidMount(){
		this.focus()
	}


	setUser = ({user, isUser})=>{
        if(isUser){
            this.setError("Username is taken")
        }
        else{
            this.setError("")
            this.props.setUser(user)
        }
    }

	setError(error){
		this.setState({error});
	}

	//Updates The Form Inputs
	handleChange(e){
		this.setState({ nickname:e.target.value })
	}

	//Handles Verification 
	handleSubmit(e){
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
		
	}
	
	//focus on input
	focus(){
		this.textInput.focus()
	}

	render() {
		const { nickname, error } = this.state 
		return (
			// .login>form.login-form>((label[for=nickname]>h1{Got a nickname?})+input[value][onChange][placeholder=Leon])
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form">

			          <label 
			          		htmlFor="nickname">
			          		<h1 style={{textAlign:"center"}}>
			          			What is your name?
			          		</h1>
			          </label>
			          
			          <input 
			          		ref={(input)=>{ this.textInput = input }}
			          		id="nickname" 
			          		type="text"
			          		value={nickname}
			          		onChange={this.handleChange}
			          		placeholder="Enter here!"
			          		/>
			          	<div className="error">{error ? error : ""}</div>
				</form>
			</div>
		);
	}
}