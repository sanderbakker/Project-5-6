import React, {Component} from 'react';
import {ModalFooter, ModalHeader, Modal, ModalBody, Form, FormGroup, Input, Label, Button} from 'reactstrap'; 
import {Products} from '../classes/API/Products.js'; 
import NotificationAlert from 'react-notification-alert'; 

class AdminCustomForm extends Component {
    constructor(props){
        super(props);
        this.state = {name: "", description: "", price: "", fetching: true, modal: false}
        this.product = new Products(); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChanges = this.handleFormChanges.bind(this); 
        this.onDismiss = this.onDismiss.bind(this); 
        this.toggle = this.toggle.bind(this); 
        this.notify = this.notify.bind(this); 
    }

    componentDidMount(){
        if(this.props.action === 'edit'){
            this.product.getCustomization(this.props.id).then(
                (value) =>
                    this.setState({name: value.name, price: value.price, description: value.description, fetching: false}) 
            )
        }
        this.setState({fetching: false});   
    }
    
    handleFormChanges(e){
        if(e.target.name === 'name'){
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
        if(this.state.name !== "" && this.state.price !== "" && this.state.description !== ""){
            if(this.props.action === 'add'){
                this.product.addCustomization(this.state.price, this.state.description, this.state.name)
                this.toggle();
                this.notify("Added customization: " + this.state.name, "success")
                this.setState({visible: true, name: "", price: "", description: ""}); 
                this.props.updateCustom();
            }
            else if(this.props.action === 'edit'){
                this.product.updateCustomization(this.props.id, this.state.name, this.state.price, this.state.description).then(
                    (val) => {
                        if(val.ok){
                            this.setState({visible: true});
                            this.toggle(); 
                            this.notify("Edited product: " + this.state.name +  " (" + this.props.id + ")", "success")                            
                            this.props.customization(); 
                            this.props.highlight(this.props.id); 
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
        this.setState({
          modal: !this.state.modal
        });
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
                <div></div>
            );      
        }
        if(this.props.action === 'edit'){
            return(
                <div>
                    <NotificationAlert ref="notify" />
                    <Button size="sm" color="warning" onClick={this.toggle}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Edit {this.state.name} </ModalHeader>
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
                                        placeholder="Enter customization name" 
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
                                    placeholder="Enter customization description" 
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
                                    placeholder="Enter customization price" 
                                    value={this.state.price}/>
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
                <NotificationAlert ref="notify" />
                <Button size="sm" className="pull-right" color="success" onClick={this.toggle}>
                    <i className="fa fa-plus"></i> Add
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add new customization</ModalHeader>
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
                                    placeholder="Enter customization name" 
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
                                placeholder="Enter customization description" 
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
                                placeholder="Enter customization price" 
                                value={this.state.price}/>
                        </FormGroup>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.name !== '' && this.state.price !== '' && this.state.description !== ''
                        ? <Button color="success" size="sm" onClick={() => this.handleSubmit()}>Add</Button>
                        : <Button color="success" size="sm" disabled={true}>Add</Button>
                        }
                        {' '}
                        <Button color="danger" size="sm" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
        
        
    }
}
export default AdminCustomForm; 