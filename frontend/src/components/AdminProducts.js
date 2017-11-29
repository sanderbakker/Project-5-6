import React, {Component} from 'react';
import {Col, Row, Input} from 'reactstrap'; 
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';
import {Products} from '../classes/API/Products.js'; 
import ProductCard from './ProductCard.js'; 
import Loading from './Loading.js';        
import AdminProductForm from './AdminProductForm.js'; 
import NotificationAlert from 'react-notification-alert'; 

class AdminProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page: 1,
          products: null, 
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
        this.notify = this.notify.bind(this); 
      }
      componentDidMount(){
            this.getAmountOfProducts(); 
      }

      getAmountOfProducts(){ 
        this.product.getProductsAmount().then(
            (val) => this.calculateNumberOfPages(val)
        );
      }

      calculateNumberOfPages(_total_amount_products){
            setTimeout( () => {
            this.setState({total: Math.ceil(_total_amount_products/9)}, () => {
                if(this.state.filter_name ===  ''){
                    this.product.getProductsPaginated(this.state.page).then(
                        (val) => {
                            if(val.length !== 0){
                                    this.setState({products: val, fetching: false}) 
                                }
                            else{
                            	this.setState({product: null, fetching: false})
                            }
                        } 
                        )
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

    async deleteProduct(_id, _name){ 
        await this.product.deleteProduct(_id); 
        this.setState({fetching: true}); 
        this.notify("Deleted product: " + _name + " (" + _id + ")", "danger");
        this.getAmountOfProducts();
    }

    filterProducts(e){        
        this.setState({filter_name: e.target.value.split(" ")[0], filter_sort: e.target.value.split(" ")[1], fetching: true});
        this.getAmountOfProducts(); 
    }

    notify(_message, _type){
        var options = {
            place: 'tr',
            message: (
                <div>
                    {_message}
                </div>
            ),
            type: _type,
            autoDismiss: 3
        }
        this.refs.notify.notificationAlert(options);
    }

    render(){
        if(this.state.fetching){
            return(
                <Col md={10}>
                    <NotificationAlert ref="notify" />
                    <Loading/>
                </Col>
            )
        }
        if(this.state.products === null){
            return(
                <Col md={{size: 10}}>
                    <Row>
                        <Col md={12}>
                            
                            <AdminProductForm action="add" updateProducts={this.getAmountOfProducts}/>
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
                </Col>
            )
        }
        return(
            <Col md={{size: 10}}>
                <Row>
                    <Col md={12}>
                        
                        <AdminProductForm action="add" updateProducts={this.getAmountOfProducts}/>
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
                                updateProducts = {this.getAmountOfProducts}
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