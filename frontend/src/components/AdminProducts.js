import React, {Component} from 'react';
import {Col, Row, Button, Input} from 'reactstrap'; 
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';
import {Products} from '../classes/API/Products.js'; 
import ProductCard from './ProductCard.js'; 
import {Link} from 'react-router-dom'; 
import Loading from './Loading.js';         

class AdminProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page: 1,
          fetching: true,
          filter_name: '',
          filter_sort: ''
        };
        this.onPageChange = this.onPageChange.bind(this);
        this.product = new Products();
        this.calculateNumberOfPages = this.calculateNumberOfPages.bind(this); 
        this.deleteProduct = this.deleteProduct.bind(this); 
        this.getAmountOfProducts = this.getAmountOfProducts.bind(this); 
        this.filterProducts = this.filterProducts.bind(this); 
      }
      componentDidMount(){
            this.getAmountOfProducts(); 
      }

      getAmountOfProducts(){
          console.log('IN amount of products'); 
        this.product.getProductsAmount().then(
            (val) => {
            this.calculateNumberOfPages(val)
                console.log(val);
        }
        );
      }

      calculateNumberOfPages(_total_amount_products){
          console.log('passed amount of products'); 
            setTimeout( () => {
            this.setState({total: Math.ceil(_total_amount_products/9)}, () => {
                console.log(this.state.filter_name)
                if(this.state.filter_name ===  ''){
                    this.product.getProductsPaginated(this.state.page).then(
                        (val) => {this.setState({products: val,  fetching: false}) 
                        })
                }
                else{    
                    this.product.getFilteredProducts(this.state.filter_name, this.state.filter_sort, 1).then(
                        (val) => this.setState({products: val,  fetching: false}) 
                    )
                }
            })}, 1000);  
      }
      
      onPageChange(page) {
          if(this.state.filter_name === '')
          {
            this.product.getProductsPaginated(page).then(
                (val) => this.setState({page: page, products: val})
            )
          }
          else{
            this.product.getFilteredProducts(this.state.filter_name, this.state.filter_sort, page).then(
                (val) => this.setState({page: page, products: val})
            ) 
          }
        // this.setState({page: page});
      }

      async deleteProduct(_id){ 
        await this.product.deleteProduct(_id); 
        this.setState({fetching: true}); 
        this.getAmountOfProducts();
      }

      filterProducts(e){        
            this.setState({filter_name: e.target.value.split(" ")[0], filter_sort: e.target.value.split(" ")[1], fetching: true});
            this.getAmountOfProducts(); 
      }

    render(){
        if(this.state.fetching){
            return(
                <Col md={10}>
                    <Loading/>
                </Col>
            )
        }
        return(
            <Col md={{size: 10}}>
                <Row>
                    <Col md={12}>
                        
                        <Link to="/admin/add/product">
                            <Button color="success" className="pull-right" size="sm"><i className="fa fa-plus"/> Add</Button>
                        </Link>
                        
                        <Col md={4} className="col-padding-left">
                            <Input onChange={this.filterProducts} value={this.state.filter_name + ' ' + this.state.filter_sort} type="select">
                                <option value=''>Default</option>
                                <option selected value='price desc'>Price (High-Low)</option>
                                <option value='price asc'>Price (Low-High)</option>
                                <option value='addedAt desc'>Added At (First-Last)</option>
                                <option value='addedAt asc' >Added At (Last-First)</option>
                                <option value='name asc'>Name (A-Z)</option>
                                <option value='name desc'>Name (Z-A)</option>
                            </Input>
                        </Col>
                        
                    </Col>
                </Row>
                <Row className="margin-top-row">
                    {this.state.products && this.state.products.map((item, i) => {
                            return <ProductCard 
                                key = {item.id}
                                id = {item.id}
                                name= {item.name}
                                admin={true}
                                description = {item.description}
                                price={item.price}
                                category={item.category}
                                delete={this.deleteProduct}
                            />
                        })} 
                </Row>
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
            </Col> 

        )
    }
}

export default AdminProducts;