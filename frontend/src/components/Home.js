import React, {Component} from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom'; 
import '../css/Home.css'; 
import HomeCarousel from './HomeCarousel.js';
import {Products} from '../classes/API/Products.js';  


class Home extends Component {
    constructor(props){
        super(props);
        this.getAllCategories = this.getAllCategories.bind(this); 
        this.createListGroupItems = this.createListGroupItems.bind(this); 
        this.state = {}
    }
    componentWillMount(){
        this.getAllCategories(); 
    }
    
    getAllCategories(){
        var products = new Products();
        var categories_promise = products.getCategories(); 
        categories_promise.then(
            (val) => {
                this.setState({categories: val}, function(){
                    this.createListGroupItems(this.state.categories); 
                }); 
            }
        );
    }

    createListGroupItems(_categories){
        var listGroupItems = [];
        var fontAwesome = ['home', 'sun-o', 'plane', 'ship', 'car', 'diamond', 'globe'];
        for (var i=0; i < _categories.length; i++) {
            listGroupItems.push(
                <ListGroupItem key={_categories[i]}>
                    <Link exact to={'/categories/' + _categories[i].toLowerCase()}>
                        <i className={"fa fa-" + fontAwesome[i]}></i> {_categories[i]}
                    </Link>
                </ListGroupItem>
                );
        }
        this.setState({list: listGroupItems});
    }
    
    render(){
        return(
            <div>
                <Container fluid={true} className="content-container container-height">
                    <Row>
                        <Col md="2">
                            <ListGroup>
                                {this.state.list}
                            </ListGroup>
                        </Col>
                        <Col md="10">
                            <HomeCarousel/>
                        </Col>
                    </Row>
                </Container>
            </div> 
        );
    }
}

export default Home; 