import React, {Component} from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom'; 
import '../css/Home.css'; 
import HomeCarousel from './HomeCarousel.js'; 

class Home extends Component {
    render(){
        return(
            <div>
                <Container fluid='true' className="content-container container-height">
                    <Row>
                        <Col md="2">
                            <ListGroup>
                                <ListGroupItem>
                                    <Link excat to='/'>
                                        <i class="fa fa-ship"></i> Ships
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link excat to='/'>
                                        <i class="fa fa-plane"></i> Planes
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link excat to='/'>
                                        <i class="fa fa-inbox"></i> Bundles
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link excat to='/'>
                                        <i class="fa fa-home"></i> Houses
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link excat to='/'>
                                        <i class="fa fa-diamond"></i> Jewelry
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link excat to='/'>
                                        <i class="fa fa-sun-o"></i> Private Islands
                                    </Link>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link excat to='/'>
                                        <i class="fa fa-globe"></i> Other
                                    </Link>
                                </ListGroupItem>
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