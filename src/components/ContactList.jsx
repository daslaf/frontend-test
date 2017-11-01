import React from 'react';

export class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
  }
  
  render() {
    const { users } = this.props;

    return (
      <table className="contact-list">
        <thead>
          <tr>
            <td><b>Nombre</b></td>
            <td><b>Descripción</b></td>
          </tr>
        </thead>
        <tbody>
        {
          users.map((user, index) => (
            <tr key={ index.toString() }>
              <td>
                <div className="contact-list__user">
                  <div 
                    className="contact-list__user-image" 
                    style={ { backgroundImage: `url(${user.photo})` } }>
                  </div>
                  
                    <b>{ user.name }</b>
                  <button 
                    className="contact-list__user-delete" 
                    onClick={() => this.deleteUser(user.id)}>
                    Eliminar
                  </button>
                </div>
              </td>
              <td>{ user.description }</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    )
  }

  /* Lift event upwards to delete user */
  deleteUser(id) {
    this.props.deleteUser(id);
  }
}