import React from 'react';
import axios from 'axios';

import { AddNewContact } from './AddNewContact.jsx';
import { ContactList } from './ContactList.jsx';
import { Paginator } from './Paginator.jsx';
import { SearchBar } from './SearchBar.jsx';

import { UserService } from '../services/UserService.js';

export class Main extends React.Component {

  constructor() {
    super();

    // Bind `this` to class methods
    this.onInputChange = this.onInputChange.bind(this);
    this.createContact = this.createContact.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onDismissModal = this.onDismissModal.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onUserSubmit = this.onUserSubmit.bind(this);

    // Set initial state 
    this.state = {
      query: '',     // search text query
      users: [],     // collection of fetched users
      modal: false,  // wether there's more data to get
      currentPage: 1,      // number of currently selected page
      isExhausted: false,  // wether the data service has been exhausted
      itemsPerPage: 5,     // number of items to show per page
      totalPages: 1       // total number of pages
    }

    // Creates instance of UserService
    this.userService = new UserService();
  }

  componentDidMount() {
    // Get all users
    this.userService.getUsers().then(res => {
      const { data: users, isExhausted } = res;
      const totalPages = this.userService.getNumberOfPages(users.length, this.state.itemsPerPage)

      this.setState({
        users,
        isExhausted,
        totalPages
      })

    });
  }

  render() {
    const { currentPage, itemsPerPage, isExhausted, query, totalPages, users } = this.state;

    const pageStart = (currentPage - 1) * itemsPerPage;
    const pageEnd = pageStart + itemsPerPage;

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase())).slice(pageStart, pageEnd)

    return (
      <div className="container">
        <h2 className="hello">Hello <b>BeeTrack</b></h2>
        <div className="top">
          <SearchBar
            query={query}
            inputChange={this.onInputChange}
          />
          <button className="button" onClick={this.createContact}>
            <i className="button__icon icon-plus-circle"></i>
            Nuevo Contacto
          </button>
        </div>
        <div className="bottom">
          {
            /* 
              Pass filtered list of users to ContactList and limit to itemsPerPage(10)
            */
          }
          <ContactList
            users={filteredUsers}
            deleteUser={this.onDeleteUser}
          />
          <Paginator
            currentPage={currentPage}
            pageChange={this.onPageChange}
            totalPages={totalPages}
          />
        </div>
        {
          /* Modal with user creation form */
          this.state.modal
            ? (
              <AddNewContact
                dismissModal={this.onDismissModal}
                submitUser={this.onUserSubmit}
              />
            )
            : null
        }
      </div>
    );

  }

  // Shows modal
  createContact() {
    this.setState({ modal: true });
  }

  /* Update state on SearchBar input change */
  onInputChange(event) {
    this.setState((prevState) => ({
      query: event
    }))
  }

  // Deletes user and updates component state
  onDeleteUser(id) {
    this.userService.deleteUser(id).then(res => {
      // If success
      if (res.status === 200) {
        const totalPages = this.userService.getNumberOfPages(this.state.users.length - 1, this.state.itemsPerPage);
        // Update users in view, manually filtering the users list
        this.setState(prevState => ({
          users: prevState.users.filter(user => user.id !== id),
          currentPage: (Math.min(totalPages, this.state.currentPage)),
          totalPages
        }));
      }
    });
  }

  // Dismiss & destroy modal component
  onDismissModal(event) {
    this.setState({ modal: false });
  }

  // When user changes a page 
  onPageChange(page) {
    // Check if next page will be a new page
    const isNewPage = page > this.state.totalPages;

    // If we're trying to fetch a new page and service hasn't been exhausted yet
    if (isNewPage && !this.state.isExhausted) {
      this.userService.getUsers(page, this.state.itemsPerPage).then(res => {
        // If response is 'empty'
        if (res.data.length === 0) {
          this.setState({
            isExhausted: res.isExhausted
          })
        } else {
          // Append new fetched data 
          this.setState(prevState => ({
            users: [...prevState.users, ...res.data],
            currentPage: page,
            isExhausted: res.isExhausted,
            totalPages: page
          }));
        }
      });
    } else {
      // If all data has been fetched => update currentPage
      this.setState({
        currentPage: page
      });
    }
  }

  // When a new contact is created 
  onUserSubmit(data) {
    // Pass Content-Type header to request
    this.userService.createUser(data).then(res => {
      if (res.status === 201) {
        const newUser = res.data;
        const totalPages = this.userService.getNumberOfPages(this.state.users.length + 1, this.state.itemsPerPage);

        this.setState(prevState => ({
          users: [newUser, ...prevState.users],
          totalPages
        }))
      }
    });
  }
}