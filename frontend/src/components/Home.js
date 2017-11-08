import React, {Component} from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom'; 
import '../css/Home.css'; 
import HomeCarousel from './HomeCarousel.js';
import {Products} from '../classes/API/Products.js';  


class Home extends Component {
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
            <div>
                <Container fluid={true} className="content-container container-height">
                    <Row>
                        <Col md={2}>
                            <ListGroup>
                                {this.state.categories && this.state.categories.map((item, i) => {
                                    var fontAwesome = ['home', 'sun-o', 'plane', 'ship', 'car', 'diamond', 'globe'];
                                    return <ListGroupItem key={item}>
                                                <Link to={'/categories/' + item.toLowerCase()}>
                                                    <i className={"fa fa-" + fontAwesome[i]}></i> {item}
                                                </Link>
                                            </ListGroupItem>
                                })}
                            </ListGroup>
                        </Col>
                        <Col md={10}>
                            <HomeCarousel/>
                        </Col>
                    </Row>
                </Container>
            </div> 
        );
    }
}
export default Home; 