import React, {Component} from 'react'; 
import {Container, Row, Col} from 'reactstrap';
import {Products} from '../classes/API/Products.js'; 
import ProductCard from './ProductCard.js'; 

export default class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.products = new Products();
		this.state = {
			products: null,
			fetching: true,
			categoryCheck: true
		}
	}

	componentWillMount() {
		// Redirect if categorie before render
		this.products.getCategory(this.props.match.params.search).then(
			(result) => {
				window.location.replace('/categories/' + result.toLowerCase());
			}
		).catch(
			(result) => {
				this.setState(this.setState({categoryCheck: false}));		
			}
		);
		
		
	}

	componentDidMount() {
        this.products.searchProducts(this.props.match.params.search).then(
            (result) => {
               	this.setState({products: result}) 
            }
        );
	}

	render() {
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
							{this.state.products && this.state.products.length === 0 && this.state.categoryCheck === false ?
								<p>Product not found</p>
								: null
							}
						</Row>
					</Col>
				</Row>
			</Container>
	    );
    }
}
