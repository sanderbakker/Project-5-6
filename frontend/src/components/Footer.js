import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import {Container, Col, Row} from 'reactstrap'; 
import '../css/Footer.css'; 

class Footer extends Component{
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
                                            <li>
                                                <Link excat to='/'>
                                                    Islands
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    Ships
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    Planes
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    Bundles
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    Houses
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    Jewelry
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    Private Islands
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    Other
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col md="3" sm="6">
                                    <div className="footer-pad">
                                        <h4>About Us</h4>
                                        <ul className="list-unstyled">
                                            <li>
                                                <Link excat to='/'>
                                                    Giftcards
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    News
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    Disclaimer
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    Privacy Policy
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    FAQs
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
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
                                                <Link excat to='/'>
                                                    <i className="fa fa-phone"></i> Phone
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    <i className="fa fa-envelope"></i> Mail
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    <i className="fa fa-facebook"></i> Facebook
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    <i className="fa fa-twitter"></i> Twitter
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
                                                    <i className="fa fa-linkedin"></i> Linkedin
                                                </Link>
                                            </li>
                                            <li>
                                                <Link excat to='/'>
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