import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, ButtonGroup} from 'reactstrap';
import {User} from '../classes/API/User.js'; 
import { Account } from '../classes/API/Account';
import NotificationAlert from 'react-notification-alert'; 

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
        this.deleteUser = this.deleteUser.bind(this); 
        this.changeAdminState = this.changeAdminState.bind(this); 
        this.notify = this.notify.bind(this); 
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
            (val) => {
                this.setState({user_id: val.id, name: val.firstName, surname: val.lastName, email: val.email, fetching: false, admin: val.isAdmin, adminState: val.isAdmin, disabled: val.isDisabled})
                
            }
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

      notify(_message, _type){
        
        var options = {
            place: 'tr',
            message: (
                <div>
                    {_message}
                </div>
            ),
            type: _type,
            autoDismiss: 2
        }
        this.refs.notify.notificationAlert(options);
      }
      handleFormSubmit(e){
        if(this.props.action === 'add'){
            this.account.register(this.state.email, this.state.password).then(
                (val) => {
                    if(typeof val.access_token !== 'undefined') {
                        this.props.user(); 
                        this.toggle();
                        this.notify("Added user: " + this.state.email, "success"); 
                        this.setState({email: '', password: ''})
                    }
                }
            )
        }
        else{ 
            this.user.update_user_profile(this.state.user_id, this.state.name, this.state.surname).then(
                (val) => {
                    if(val.ok && val.status === 204){ 
                        if(this.state.admin === true && this.state.adminState === false){
                            this.user.adminifyUser(this.state.user_id); 
                        }
                        if(this.state.admin === false && this.state.adminState === true){
                            this.user.disableAdmin(this.state.user_id); 
                        }
                        this.props.user(); 
                        this.toggle(); 
                        this.notify("Edited user: " + this.state.email, "success"); 
                        this.setState({firstName: '', lastName: ''});
                    }
                }
            )  
            this.props.highlight(this.props.id);  
        }
      }
      deleteUser(){
          this.user.disableUser(this.state.user_id);
          this.setState({
            disabled: !this.state.disabled
          });
          this.notify("Disabled user: " + this.state.email, "danger");
          this.props.user();
      }
      
      changeAdminState(){
        this.setState({
            admin: !this.state.admin
          });      
      }
      enableUser(){
          this.user.enableUser(this.state.user_id);
          this.setState({
                disabled: !this.state.disabled
          });
          this.notify("Enabled user: " + this.state.email, "success")
          this.props.user(); 
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
                    <ButtonGroup size="sm">
                        <Button color="warning" size="sm" onClick={this.toggle}><i className="fa fa-pencil"></i></Button>
                        
                        {!this.state.disabled 
                        ? <Button color="danger" size="sm" onClick={() => {if(window.confirm('Disable this user?')) this.deleteUser()}}><i className="fa fa-minus"></i></Button>
                        : <Button color="success" size="sm" onClick={() => {if(window.confirm('Enable this user?')) this.enableUser()}}><i className="fa fa-plus"></i></Button>}
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
                            <FormGroup>
                                <Label for="surnameLabel">Surname</Label>
                                <Input 
                                    size='sm' 
                                    type="text" 
                                    onChange={this.handleFormChanges} 
                                    name="surname" 
                                    id="surnameLabel" 
                                    placeholder="Enter surname" 
                                    value={this.state.surname}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    {this.state.admin ? 
                                    <Input checked
                                        type="checkbox"
                                        name="isAdmin"
                                        onClick={() => this.changeAdminState()}
                                    />
                                    : <Input 
                                        type="checkbox" 
                                        name="isAdmin"
                                        onClick={() => this.changeAdminState()}
                                        />
                                    }
                                    {' '}
                                     Admin?
                                </Label>
                            </FormGroup>
                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" size="sm" onClick={(e) => this.handleFormSubmit(e)}>Save</Button>{' '}
                            <Button color="danger" size="sm" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
        return(
            <div>
            <NotificationAlert ref="notify" />
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