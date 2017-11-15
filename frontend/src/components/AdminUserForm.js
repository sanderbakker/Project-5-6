import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, ButtonGroup} from 'reactstrap';
import {User} from '../classes/API/User.js'; 
import { Account } from '../classes/API/Account';

class AdminUserForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          password: '',
          name: '',
          surname: '',
          email: ''
        };
        this.handleFormChanges = this.handleFormChanges.bind(this); 
        this.toggle = this.toggle.bind(this);
        this.user = new User();   
        this.account = new Account(); 
        this.handleClick = this.handleClick.bind(this); 
      }
    
      componentWillMount(){
          if(this.props.action === 'edit'){
              this.getUser(this.props.id); 
          }
      }
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

      getUser(){
        this.user.user_data(this.props.id).then(
            (val) => this.setState({name: val.firstName, surname: val.lastName, email: val.email, fetching: false})
        )
      }

      handleFormChanges(e){
        if(e.target.name === 'surname'){
            this.setState({surname: e.target.value});
        }
        else if(e.target.name === 'name'){
            this.setState({name: e.target.value}); 
        }
        else if(e.target.name === 'email'){
            this.setState({email: e.target.value}); 
        }
        else if(e.target.name === 'password'){
            this.setState({password: e.target.value}); 
        }
      }

      handleClick(){
           
      }
      handleFormSubmit(){
        this.account.register(this.state.email, this.state.password).then(
            (val) => {
                if(typeof val.access_token !== 'undefined') {
                    this.props.user(); 
                    this.toggle();
                    this.setState({email: '', password: ''})
                }
            }
        )

      }

    render(){
        if(this.state.fetching){
            return(
                <div></div>
            )
  ;      }
        if(this.props.action === 'edit'){
            return(
                <div>
                    <ButtonGroup size="sm">
                        <Button color="warning" size="sm" onClick={this.toggle}><i className="fa fa-pencil"></i></Button>
                        <Button color="danger" size="sm"><i className="fa fa-minus"></i></Button>
                    </ButtonGroup>
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
                                    placeholder="Enter name" 
                                    value={this.state.name}/>
                            </FormGroup>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
        return(
            <div>
            <Button className="float-right" color="success" size="sm" onClick={this.toggle}><i className="fa fa-plus"></i> Add</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add new user</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="emailLabel">Email</Label>
                        <Input 
                            size='sm' 
                            type="text" 
                            onChange={this.handleFormChanges} 
                            name="email" 
                            id="emailLabel" 
                            placeholder="Enter email" 
                            value={this.state.email}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordLabel">Password</Label>
                        <Input 
                            size='sm' 
                            type="password" 
                            onChange={this.handleFormChanges} 
                            name="password" 
                            id="passwordLabel" 
                            placeholder="Enter password" 
                            value={this.state.password}/>
                    </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" size="sm" onClick={() => this.handleFormSubmit()}>Add</Button>{' '}
                    <Button color="secondary" size="sm" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}
export default AdminUserForm; 