import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import {Container, Col, Row} from 'reactstrap'; 
import '../css/Footer.css'; 
import {Products} from '../classes/API/Products.js'; 

class Footer extends Component{
    constructor(props){
        super(props);
        this.getAllCategories = this.getAllCategories.bind(this); 
        this.createList = this.createList.bind(this); 
        this.state = {};
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
                    this.createList(this.state.categories); 
                }); 
            }
        );
    }

    createList(_categories){
        var listItems = [];
        for (var i=0; i < _categories.length; i++) {
            listItems.push(
                <li key={_categories[i]}>
                    <Link to={'/categories/' + _categories[i].toLowerCase()}>
                        {_categories[i]}
                    </Link>
                </li>
                );
        }
        this.setState({list: listItems});
    }
    render(){
        return(
            <div>
                <footer className="mainfooter" role="contentinfo">
                    <div className="footer-middle">
                        <Container>
                            <Row>
                                <Col md="3" sm="3">
                                    <div className="footer-pad">
                                        <h4>Address</h4>
                                            <address>
                                                <ul className="list-unstyled">
                                                    <li>
                                                        Hogeschool Rotterdam<br></br>
                                                        Wijnhaven 109<br></br>
                                                        Rotterdam<br></br>
                                                        3011 WN <br></br>
                                                    </li>
                                                </ul>
                                            </address>
                                    </div>
                                </Col>
                                <Col md="3" sm="6">
                                
                                    <div className="footer-pad">
                                        <h4>Categories</h4>
                                        <ul className="list-unstyled">
                                            {this.state.list}
                                        </ul>
                                    </div>
                                </Col>
                                <Col md="3" sm="6">
                                    <div className="footer-pad">
                                        <h4>About Us</h4>
                                        <ul className="list-unstyled">
                                            <li>
                                                <Link to='/'>
                                                    Giftcards
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    News
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    Disclaimer
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    Privacy Policy
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    FAQs
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    Webmaster
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col sm="6" md="3">
                                    <div className="footer-pad">
                                        <h4>Contact Us</h4>
                                        <ul className="list-unstyled">
                                            <li>
                                                <Link to='/'>
                                                    <i className="fa fa-phone"></i> Phone
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    <i className="fa fa-envelope"></i> Mail
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    <i className="fa fa-facebook"></i> Facebook
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    <i className="fa fa-twitter"></i> Twitter
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    <i className="fa fa-linkedin"></i> Linkedin
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/'>
                                                    <i className="fa fa-google"></i> Google
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="footer-bottom">
                        <Container>
                            <Row>
                                <Col xs='12'>
                                    <p className="text-xs-center">[NAME] &copy; 2017 </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer; 