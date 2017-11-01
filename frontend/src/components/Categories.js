import React, {Component} from 'react'; 
import {Container, Row, Col} from 'reactstrap';
import {Products} from '../classes/API/Products.js';  

import car from '../assets/car.jpg';
import ship from '../assets/yacht.jpg';
import plane from '../assets/plane.jpg'; 
import house from '../assets/house2.jpg';
import island from '../assets/slider2.jpg'; 
import other from '../assets/circuit1.jpg';
import jewelry from '../assets/jewelry.jpg'; 

import '../css/Categories.css';
import CategoryCard from './CategoryCard.js'; 

var imageArray = [house, island, plane, ship, car, jewelry, other];

class Categories extends Component {
    constructor(props){
        super(props); 
        this.state = {}
        this.getAllCategories = this.getAllCategories.bind(this);
        this.createCategoryCards = this.createCategoryCards.bind(this); 
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
                    this.createCategoryCards(this.state.categories); 
                }); 
            }
        ); 
    }
    createCategoryCards(_categories){
        var categoryCards = [];
        for (var i=0; i < _categories.length; i++) {
            categoryCards.push(
                <CategoryCard 
                    image={imageArray[i]}
                    title={_categories[i]}
                />);
        }
        this.setState({cards: categoryCards});
    }

    render(){
        return(
            <div>
                <Container className='content-container'> 
                    <Row>
                        <Col md="12">
                            <h4 className="mb-0">Categories</h4>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.cards}
                    </Row>
                </Container>
            </div>
        ); 
    }
}
export default Categories; 