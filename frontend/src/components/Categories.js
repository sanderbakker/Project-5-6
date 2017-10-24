import React, {Component} from 'react'; 
import {Container, Row, Card, Col, CardBody, CardImg, CardSubtitle} from 'reactstrap';
import car from '../assets/slider1.jpg';
import '../css/Categories.css'; 
import ship from '../assets/slider3.jpg';
import circuit from '../assets/circuit1.jpg';
import house from '../assets/house2.jpg';
import island from '../assets/slider2.jpg'; 
import {Link} from 'react-router-dom';

// The pattern in this component: 
//     First creat a Col md 3 (4 items a row)
//     Create a link, get category from DB and add it in the to property
//     Then add a card with image (DB) and items (DB) 
//     Repeat this in a foreach (map in react) for each category we have 

class Categories extends Component {
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
                        <Col md="3">
                            <Link to='/categories/ships'>
                                <Card>
                                    <CardImg top width="100%" height='130px' src={ship} alt="Card image cap" />
                                    <CardBody>
                                        <CardSubtitle>Ships</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        <Col md="3">
                            <Link to='/categories/planes'>
                                <Card>
                                    <CardImg top width="100%" height='130px' src={car} alt="Card image cap" />
                                    <CardBody>
                                        <CardSubtitle>Planes</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        <Col md="3">
                            <Link to='/categories/jewerly'>
                                <Card>
                                    <CardImg top width="100%"  height='130px' src={car} alt="Card image cap" />
                                    <CardBody>
                                        <CardSubtitle>Jewerly</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        <Col md="3">
                            <Link to='/categories/bundles'>
                                <Card>
                                    <CardImg top width="100%" height='130px' src={circuit} alt="Card image cap" />
                                    <CardBody>
                                        <CardSubtitle>Bundles</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        <Col md="3">
                            <Link to='/categories/islands'>
                                <Card>
                                    <CardImg top width="100%" height='130px' src={island} alt="Card image cap" />
                                    <CardBody>
                                        <CardSubtitle>Islands</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        <Col md="3">
                            <Link to='/categories/cars'>
                                <Card>
                                    <CardImg top width="100%" height='130px' src={car} alt="Card image cap" />
                                    <CardBody>
                                        <CardSubtitle>Cars</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                        <Col md="3">
                            <Link to='/categories/other'>
                                <Card>
                                    <CardImg top width="100%" height='130px' src={house} alt="Card image cap" />
                                    <CardBody>
                                        <CardSubtitle>Other</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        ); 
    }
}
export default Categories; 