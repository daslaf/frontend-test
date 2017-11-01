import React from 'react';

export class NewContact extends React.Component {
  constructor(props) {
    super(props);

    this.createContact = this.createContact.bind(this);
  }
  
  render() {
    return (
      <button className="button" onClick={this.createContact}>
        <i className="button__icon icon-plus-circle"></i>
        Nuevo Contacto
      </button>
    );
  }  

  createContact() {
    this.props.createContact();
  }
}