import React, {Component} from 'react'; 
import {Container, Row, Col} from 'reactstrap';
import {Products} from '../classes/API/Products.js';  

export default class SearchResult extends Component {
	constructor(props) {
		super(props);
	

	}

	render() {
		return (
			<p>{this.props.match.params.search}</p>
		)
	}
}
