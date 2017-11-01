import React from 'react';

export class AddNewContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: '',
      name: '',
      description: ''
    }

    this.dismissModal = this.dismissModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }

  render() {
    const { photo, name, description } = this.state;

    return (
      <div className="modal-container">
        <div className="backdrop"
          onClick={ this.dismissModal }>
        </div>
        <div className="modal">
          <div className="modal__header">
            <h2>Agregar nuevo contacto</h2>
          </div>
          <div className="modal__body">
            <form>
              <label className="modal__label">
                URL imagen de perfil<span>*</span>
                <input
                  onChange={this.handleInputChange} 
                  type="text" 
                  name="photo"
                  value={photo} 
                  required
                /> 
              </label>
              <label className="modal__label">
                Nombre<span>*</span>
                <input 
                  onChange={this.handleInputChange} 
                  type="text" 
                  name="name"
                  value={name} 
                  required
                /> 
              </label>
              <label className="modal__label">
                Descripción<span>*</span>
                <textarea 
                  onChange={this.handleInputChange} 
                  name="description"
                  value={description} 
                  required></textarea> 
              </label>

              <button 
                className="button" 
                type="button" 
                onClick={ this.submitUser }>
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  dismissModal() {
    this.props.dismissModal();
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  submitUser() {
    this.props.submitUser(this.state);
    this.dismissModal();
  }
}