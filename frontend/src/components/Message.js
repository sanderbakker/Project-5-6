import React, {Component} from 'react';

class Message extends Component {
	construct() {
		this.issetMessage = true; 
	}

	render() {
		let className = "alert alert-" + this.props.type; 

		return (<div class={className}>
			 {this.props.message}
			</div>);
	}

}

export default Message;
