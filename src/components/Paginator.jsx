import React from 'react';

export class Paginator extends React.Component {
  constructor(props) {
    super(props);

    this.goToPage = this.goToPage.bind(this);
  }
  
  render() {
    const { currentPage, totalPages } = this.props;

    const pages = new Array(totalPages).fill("").map((item, index) => index + 1)

    return (
      <div className="paginator">
        <button 
          className="button button--link"
          onClick={() => this.goToPage(currentPage - 1) }
          disabled={ currentPage == 1 }>
          <i className="button__icon icon-arrow-circle-left"></i> 
          Página anterior
        </button>
        <div className="paginator__pages">
        {
          pages.map((page, index) => (
            <button 
              key={ index }
              onClick={() => this.goToPage(index + 1) }
              className={ currentPage === (index + 1)  ? "active paginator__page" : "paginator__page"}>
              { page }
            </button>
          ))
        }
        </div>
        <button 
          className="button button--link"
          onClick={() => this.goToPage(currentPage + 1) }
          disabled={ currentPage === totalPages }>
          Siguiente página 
          <i className="button__icon icon-arrow-circle-right"></i>
        </button>
      </div>
    );
  }

  goToPage(page) {
    this.props.pageChange(page);
  }
}