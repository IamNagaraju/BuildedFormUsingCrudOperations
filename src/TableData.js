import React, { Component } from 'react';

class TableData extends Component {

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function (product) {
      if (product.name.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      return (<TableRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id} />)
    });
    return (
      <div>

        <table className="table table-bordered p-3 mb-2 bg-dark text-white">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>Url</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {product}

          </tbody>

        </table>
      </div>
    );

  }

}

class TableRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);
  }

  onProductTableUpdate() {
    this.props.onProductTableUpdate(this.props.product)
  }
  render() {

    return (
      <tr key={this.props.product.id}>
        <td>{this.props.product.id}</td>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.location}</td>
        <td>{this.props.product.url}</td>
        <td> <input type="button" onClick={this.onDelEvent.bind(this)} value="Delete" /></td>
      </tr>
    );

  }

}

export default TableData;