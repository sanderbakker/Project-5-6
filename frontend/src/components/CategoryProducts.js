import React, {Component} from 'react'; 
import {Col, Row, Container} from 'reactstrap';
import {Products} from '../classes/API/Products.js';  
import ProductCard from './ProductCard.js'; 
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'; 

class CategoryProducts extends Component{
    constructor(props){
        super(props); 
        this.state = {
            page: 1,
            fetching: true, 
            products: null
          };
        this.products = new Products(); 
        this.calculateNumberOfPages = this.calculateNumberOfPages.bind(this);
        this.onPageChange = this.onPageChange.bind(this); 
    }

    componentDidMount(){
        this.products.getProductsInCategory(this.props.name).then(
            (val) => {
                this.calculateNumberOfPages(val.length); 
            }
        );
    }

    calculateNumberOfPages(_total_amount_products){
        this.setState({total: Math.ceil(_total_amount_products/9)}, () => {
            this.products.getProductsByCategoryPaginated(this.props.name, 1).then(
                (val) => this.setState({products: val,  fetching: false}) 
            )
        });  
    }
    onPageChange(page) {
        this.products.getProductsByCategoryPaginated(this.props.name, page).then(
            (val) => this.setState({page: page, products: val})
        )
      }

    render(){
        if(this.state.fetching){
            console.log(this.state.fetching, this.state.products); 
            return (
                
                <Container className='content-container'> 
                <Row>
                    <Col md={12}>
                        <h4 className="mb-0">{this.props.name}</h4>
                        <hr></hr>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        Some space for possible filters in the future 
                    </Col>
                    <Col md={9}>
                        <Row>
                            </Row>
                            </Col>
                            </Row>
                            </Container>
            )
        }
        console.log(this.state.fetching, this.state.products); 
        return(
            <Container className='content-container'> 
                <Row>
                    <Col md={12}>
                        <h4 className="mb-0">{this.props.name}</h4>
                        <hr></hr>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        Some space for possible filters in the future 
                    </Col>
                    <Col md={9}>
                        <Row>
                            {this.state.products && this.state.products.length === 0 ? 
                                <p>No products found in this category</p> 
                                : 
                                null
                            }
                            {this.state.products && this.state.products.map(function(item, i){
                                return <ProductCard 
                                            key={item.id} 
                                            id={item.id}
                                            name={item.name} 
                                            description={item.description}
                                            price={item.price} />
                            })}
                        </Row>
                    </Col>
                </Row>
                {this.state.products.length !== 0 ?
                <Row>
                <Col md={12}>
                    <div className='float-right'>
                        <UltimatePagination 
                            currentPage={this.state.page} 
                            totalPages={this.state.total} 
                            onChange={this.onPageChange}
                        />
                    </div>
                </Col>
                </Row>
                : ""}
            </Container>
        );
    }
}
export default CategoryProducts;