import React, {Component} from 'react'; 
import {Col, Row, Container} from 'reactstrap';

class Product extends Component {
    render(){
        return(
            <div>
            {this.props.match.params.id}
            </div>
        )
    }
}
export default Product; 