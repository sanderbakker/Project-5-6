import React, {Component} from 'react';
import {Row, Col, Container, Form, Alert, FormGroup, Input, Label, Button} from 'reactstrap'; 
import {Products} from '../classes/API/Products.js'; 
import {Link} from 'react-router-dom';

class AdminProductForm extends Component {
    constructor(props){
        super(props);
        this.state = {name: "", category: "", description: "", price: "", fetching: true}
        this.product = new Products(); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChanges = this.handleFormChanges.bind(this); 
        this.onDismiss = this.onDismiss.bind(this); 
    }

    componentDidMount(){
        this.product.getCategories().then(
            (val) =>{ 
                this.setState({categories: val}) 
                console.log(this.props.key)
                this.product.getProduct(this.props.match.params.id).then(
                    
                    (value) =>
                        
                        this.setState({name: value.name, category: value.categoryString, price: value.price, description: value.description, fetching: false}) 
                )
            }
        );
        
    }
    
    handleFormChanges(e){
        if(e.target.name === 'category'){
            this.setState({category: e.target.value});
        }
        else if(e.target.name === 'name'){
            this.setState({name: e.target.value}); 
        }
        else if(e.target.name === 'description'){
            this.setState({description: e.target.value}); 
        }
        else if(e.target.name === 'price'){
            this.setState({price: e.target.value}); 
        }
    }

    handleSubmit(e){
        e.preventDefault(); 
        if(this.state.name !== "" && this.state.price !== "" && this.state.description !== "" && this.state.category !== ""){
            if(this.props.action === 'add'){
                this.product.addProduct(this.state.price, this.state.description, this.state.category, this.state.name)
                .then(
                    (val) => {
                        if(val.id === undefined){
                            this.setState({failed: true}); 
                        }
                        this.setState({visible: true}); 
                    }
                )
            }
            else if(this.props.action === 'edit'){
                this.product.updateProduct(this.props.match.params.id, this.state.description, this.state.price, this.state.category, this.state.name).then(
                    (val) => {
                        if(val.ok && val.status === 204){
                            this.setState({visible: true});
                        }
                        else{
                            this.setState({failed: true})
                        }
                    }
                )  
            }
        }
        else{ 
            this.setState({failed: true}); 
        }
    }

    onDismiss(){
        this.setState({visible: false}); 
    }

    render(){
        if(this.state.fetching){
            return(
                <div></div>
            )
        }
        return(
            <Container className="content-container">
                <Row>
                    <Col md={6}>
                    {(this.state.failed) ?
                            <Alert color="danger">
                                {this.props.action === 'add'
                                ? "Failed to add new product! Try again."
                                : "Failed to update product! Try again."} 
                            </Alert>
                            : (this.state.visible) ?
                                <Alert isOpen={this.state.visible} toggle={this.onDismiss} color='success'>
                                    {this.props.action === "add"
                                    ? "Added new product to the webshop"
                                    : "Updated product"
                                    }
                                </Alert> 
                            : ""
                            }
                    <Form>
                        <FormGroup>
                            <Label for="nameLabel">Name</Label>
                            <Input 
                                size='sm' 
                                type="text" 
                                onChange={this.handleFormChanges} 
                                name="name" 
                                id="nameLabel" 
                                placeholder="Enter product name" 
                                value={this.state.name}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="descriptionLabel">Description</Label>
                            <Input 
                                size='sm' 
                                type="textarea" 
                                onChange={this.handleFormChanges} 
                                name="description" 
                                id="descriptionLabel" 
                                placeholder="Enter product description" 
                                value={this.state.description}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="priceLabel">Price</Label>
                            <Input 
                                size='sm' 
                                type="number"
                                step="0.01" 
                                onChange={this.handleFormChanges} 
                                name="price" 
                                id="priceLabel" 
                                placeholder="Enter product price" 
                                value={this.state.price}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="categoryLabel">Category</Label>
                            <Input 
                                size='sm' 
                                type="select" 
                                onChange={this.handleFormChanges} 
                                name="category" 
                                id="categoryLabel" 
                                placeholder="Select the category"
                                value={this.state.category}
                                >
                                <option></option>
                                {this.state.categories.map((item, i) => {
                                    return <option key={item}>{item}</option> 
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="imageLabel">Images</Label>
                            <Input 
                                size='sm' 
                                type="file" 
                                multiple={true}
                                onChange={this.handleFormChanges} 
                                name="images" 
                                id="imageLabel" />
                        </FormGroup>
                        <Button size='sm' color='secondary' onClick={this.handleSubmit}>
                            {this.props.action === 'edit' ? "Edit" 
                            : "Add"
                            } 
                        </Button>
                            <Link to='/admin/products'>
                                <Button size='sm' className='float-right' color='danger'>Return to dashboard</Button>
                            </Link>
                        </Form>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default AdminProductForm; 