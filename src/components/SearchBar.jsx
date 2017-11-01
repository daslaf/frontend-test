import React from 'react';

export class SearchBar extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  render() {
    const { query } = this.props;
    return (
      <div className="searchbar">
        <i className="searchbar__icon icon-search"></i>
        <input 
          type="search" 
          className="searchbar__input"
          placeholder="Buscar contacto..."
          value={ query }
          onChange={ this.handleInputChange }
        />
      </div>
    );
  }

  handleInputChange(event) {
    // Lift state up on change
    this.props.onInputChange(event.target.value);
  }
}