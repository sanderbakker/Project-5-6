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

import CategoryCard from './CategoryCard.js'; 

class Categories extends Component {
    constructor(props){
        super(props); 
        this.state = {}
    }
    
    componentWillMount(){
        var products = new Products();
        products.getCategories().then(
            (val) => {
                this.setState({categories: val}); 
            }
        );  
    }

    render(){
        return(
                <Container className='content-container'> 
                    <Row>
                        <Col md="12">
                            <h4 className="mb-0">Categories</h4>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row>
                        {this.state.categories && this.state.categories.map(function(item, i){
                            var imageArray = [house, island, plane, ship, car, jewelry, other];
                            return <CategoryCard 
                                        key={item}
                                        image={imageArray[i]}
                                        title={item}
                                    />
                        })}
                    </Row>
                </Container>
        ); 
    }
}
export default Categories; 