import React from 'react';
import axios from 'axios';

import { SearchBar } from './SearchBar.jsx';
import { NewContact } from './NewContact.jsx';
import { ContactList } from './ContactList.jsx';
import { AddNewContact } from './AddNewContact.jsx';

export class Main extends React.Component {

  constructor() {
    super();

    // Bind `this` to class methods
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onCreateContact = this.onCreateContact.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onDismissModal = this.onDismissModal.bind(this);
    this.onUserSubmit = this.onUserSubmit.bind(this);

    // Set initial state 
    this.state = { 
      query: '',
      users: [],
      modal: false
    }
  }
  
  componentDidMount() {
    // Get all users
    axios.get('/api/users').then(res => {
      const users = res.data;
      // Save response to users in state
      this.setState(prevState => ({
        users
      }));
    })
  }

  render() {
    return (
      <div className="container">
        <h2 className="hello">Hello <b>BeeTrack</b></h2>
        <div className="top">
          <SearchBar 
            query={this.state.query} 
            onInputChange={ this.handleInputChange } 
          />
          <NewContact 
            createContact={ this.onCreateContact }
          />
        </div>
        <div className="bottom">
          {/* Pass filtered list of users to ContactList */}
          <ContactList 
            users={ this.state.users.filter(user => user.name.includes(this.state.query)) }
            deleteUser={ this.onDeleteUser }
          />
        </div> 
        {
          this.state.modal 
            ? (
              <AddNewContact 
                dismissModal={ this.onDismissModal }
                submitUser={ this.onUserSubmit } 
              />
            )
            : null
        }
      </div>
    );

  }

  /* Update state on SearchBar input change */
  handleInputChange(event) {
    this.setState((prevState) => ({
      query: event
    }))
  }

  /* */
  onCreateContact() {
    this.setState({ modal: true });
  }

  /* Deletes user and updates component state */
  onDeleteUser(id) {
    axios.delete(`/api/users/${id}`).then(res => {
      // If success
      if (res.status === 200) {
        // Update users in view, manually filtering the users list
        this.setState(prevState => ({
          users: prevState.users.filter(user => user.id !== id )
        }))

      }
    });
  }

  /* Dismiss modal & destroys Modal component */
  onDismissModal(event) {
    this.setState({ modal: false });
  }

  onUserSubmit(data) {
    const payload = JSON.stringify(data);

    // console.log('creating user', payload, {
    //   headers: { "Content-Type": "application/json" }
    // });
    axios.post(
      '/api/users', 
      payload, 
      {
        headers: { "Content-Type": "application/json" }
      }).then(res => {
        if ( res.status === 201 ) {
          console.log('user succesfully added', res);

          const newUser = res.data;
          // Update users in view, manually filtering the users list
          this.setState(prevState => ({
            users: [ ...prevState.users, newUser ]
          }))
        }
      });
  }
}