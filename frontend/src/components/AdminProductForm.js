import React, {Component} from 'react';
import {ModalFooter, ModalHeader, Modal, ModalBody, Form, FormGroup, Input, Label, Button} from 'reactstrap'; 
import {Products} from '../classes/API/Products.js'; 

class AdminProductForm extends Component {
    constructor(props){
        super(props);
        this.state = {name: "", category: "", description: "", price: "", fetching: true, modal: false}
        this.product = new Products(); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChanges = this.handleFormChanges.bind(this); 
        this.onDismiss = this.onDismiss.bind(this); 
        this.toggle = this.toggle.bind(this); 
    }

    componentDidMount(){
        this.product.getCategories().then(
            (val) =>{ 
                this.setState({categories: val, fetching: false}) 
                if(this.props.action === 'edit'){
                    this.product.getProduct(this.props.id).then(
                        (value) =>
                            this.setState({name: value.name, category: value.categoryString, price: value.price, description: value.description, fetching: false}) 
                    )
                }
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

    handleSubmit(){
        if(this.state.name !== "" && this.state.price !== "" && this.state.description !== "" && this.state.category !== ""){
            if(this.props.action === 'add'){
                this.product.addProduct(this.state.price, this.state.description, this.state.category, this.state.name)
                .then(
                    (val) => {
                        if(val.id === undefined){
                            this.setState({failed: true});  
                        }
                        this.setState({visible: true, name: "", category: "", price: "", description: ""}); 
                        this.props.updateProducts();
                        this.toggle();
                    }
                )
            }
            else if(this.props.action === 'edit'){
                this.product.updateProduct(this.props.id, this.state.description, this.state.price, this.state.category, this.state.name).then(
                    (val) => {
                        if(val.ok && val.status === 204){
                            this.setState({visible: true});
                            this.toggle(); 
                            this.props.products(); 
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
    
    toggle() {
        console.log('toggle triggered'); 
        this.setState({
          modal: !this.state.modal
        });
      }

    render(){
        if(this.state.fetching){
            return(
                <div></div>
            );      
        }
        if(this.props.action === 'edit'){
            return(
                <div>
                    <Button size="sm" color="warning" onClick={this.toggle}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Edit {this.state.name} {this.state.surname}</ModalHeader>
                        <ModalBody>
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
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" size="sm" onClick={() => this.handleSubmit()}>Save</Button>{' '}
                            <Button color="danger" size="sm" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
        
        return(
            <div>
                <Button size="sm" className="pull-right" color="success" onClick={this.toggle}>
                    <i className="fa fa-plus"></i> Add
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add new product</ModalHeader>
                    <ModalBody>
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
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" size="sm" onClick={() => this.handleSubmit()}>Add</Button>{' '}
                        <Button color="danger" size="sm" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
        
        
    }
}
export default AdminProductForm; 