import React, {Component} from 'react';
import {Col, Row, Button} from 'reactstrap'; 
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';
import {Products} from '../classes/API/Products.js'; 
import ProductCard from './ProductCard.js'; 
import {Link} from 'react-router-dom'; 

class AdminProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page: 1,
          fetching: true
        };
        this.onPageChange = this.onPageChange.bind(this);
        
        this.product = new Products();
         

        this.calculateNumberOfPages = this.calculateNumberOfPages.bind(this); 
      }
      componentDidMount(){
        this.product.getProductsAmount().then(
            (val) => 
            this.calculateNumberOfPages(val)
        );
      }

      calculateNumberOfPages(_total_amount_products){
            this.setState({total: Math.ceil(_total_amount_products/9)}, () => {
                this.product.getProductsPaginated(1).then(
                    (val) => this.setState({products: val,  fetching: false}) 
                )
            });  
      }
      
      onPageChange(page) {
        this.product.getProductsPaginated(page).then(
            (val) => this.setState({page: page, products: val})
        )
        // this.setState({page: page});
      }

    render(){
        if(this.state.fetching){
            return(
                <div>
                </div>
            )
        }
        return(
            <Col md={{size: 10}}>
                <Row>
                    <Col md={12}>
                        <Link to="/admin/add/product">
                            <Button color="success" className="pull-right" size="sm"><i className="fa fa-plus"/> Add</Button>
                        </Link>
                    </Col>
                </Row>
                <Row className="margin-top-row">
                    {this.state.products && this.state.products.map((item, i) => {
                            return <ProductCard 
                                key = {item.id}
                                name= {item.name}
                                admin={true}
                                description = {item.description}
                            />
                        })} 
                </Row>
                <Row>
                <Col md={12}>
                    <div className='float-right'>
                        {console.log(this.state.products)}
                        <UltimatePagination 
                            currentPage={this.state.page} 
                            totalPages={this.state.total} 
                            onChange={this.onPageChange}
                        />
                    </div>
                </Col>
                </Row>
                
        </Col> 

        )
    }
}

export default AdminProducts;