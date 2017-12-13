import React, {Component} from 'react'; 
import {Container, Row, Col} from 'reactstrap';
import {Products} from '../classes/API/Products.js'; 
import ProductCard from './ProductCard.js'; 
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'; 
import Loading from './Loading.js'; 

class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.products = new Products();
		this.state = {
			products: null,
			page: 1,
			fetching: true,
		}
		this.onPageChange = this.onPageChange.bind(this);
        this.product = new Products();
        this.calculateNumberOfPages = this.calculateNumberOfPages.bind(this); 
        this.getAmountOfProducts = this.getAmountOfProducts.bind(this); 
	}

	componentDidMount() {
		this.getAmountOfProducts(); 
	}
	getAmountOfProducts(){ 
		this.products.searchProducts(this.props.match.params.search, this.state.page).then(
            (result) => {
               	this.calculateNumberOfPages(result.length);  
            }
        );
      }

	calculateNumberOfPages(_total_amount_products){
		setTimeout( () => {
            this.setState({total: Math.ceil(_total_amount_products/9)}, () => {
                this.products.searchProductsPaginated(this.props.match.params.search, this.state.page).then(
						
					(val) => {
						if(val.length !== 0){
							this.setState({products: val, fetching: false}) 
						}
						else{
							this.setState({product: null, fetching: false})
						}
					}	
					)
            })}, 1000);  
	}
	
	onPageChange(page) {
		this.product.searchProductsPaginated(this.props.match.params.search, page).then(
			(val) => this.setState({page: page, products: val})
		);
	}
	

	render() {
		if(this.state.fetching){
			return (
				<Container className="content-container">
				<Loading/>
				</Container>
			)
		}
		if(this.state.products === null){
			return (
				<Container className='content-container'>
					<Row>
						<Col md={3}>
						</Col>
						<Col md={9}>
							No products found for query: {this.props.match.params.search}
						</Col>
					</Row>
				</Container>
			)
		}
		return (
			<Container className='content-container'>
				<Row>
					<Col md={3}>
					</Col>
					<Col md={9}>
						<Row>
							{this.state.products && this.state.products.map(function(item, i){		
								return <ProductCard 
												key={item.id} 
												id={item.id}
												name={item.name} 
												description={item.description}
												price={item.price} />
							})}
							{this.state.products && this.state.products.length === 0 ?
								<p>Product not found</p>
								: null
							}
						</Row>
					</Col>
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
				
			</Container>
	    );
    }
}

export default SearchResult;