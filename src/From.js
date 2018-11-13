import React, { Component } from 'react';
import axios from "axios"
import MapShowing from "./MapShowing"
import TableData from "./TableData"
import SearchBar from "./SearchBar"
import AddUpdateForm from "./AddUpdateForm"

class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      products: [],
      successMsg: '',
      updateMsg: ''
    }
  }

  componentDidMount() {
    axios.get('https://interviewapikloc.herokuapp.com/stores.json').then(res => {
      this.setState({
        products: res.data
      })
    })
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };
  handleRowDel(product) {
    // console.log(product.id)
    var index = this.state.products.indexOf(product);
    axios.delete(`https://interviewapikloc.herokuapp.com/stores/${product.id}.json`).then(res => {
      console.log(res.data)
      this.state.products.splice(index, 1);
      this.setState(this.state.products);
    })
  };

  handleAddEvent(data) {
    axios.post(`https://interviewapikloc.herokuapp.com/stores.json`, data).then(res => {
      console.log(res.data)
      const bataData = res.data
      let data = this.state.products
      data.push(bataData)
      this.setState({ products: data })
    })
    setTimeout(() => {
      this.setState({
        successMsg: 'sucess Data Added'
      })
    }, 1)
    //   this.state.products.push(product);
    //   this.setState(this.state.products);

  }

  handleProductTable(product) {
    console.log(product)
    var index = this.state.products.indexOf(product);
    axios.put(`https://interviewapikloc.herokuapp.com/stores/${product.id}.json`, product).then(res => {
      const bataData = res.data
      let data = this.state.products
      this.state.products.splice(index, 1)
      data.push(bataData)

      this.setState({
        // updateMsg:'Successf',
        products: data
      })
      // this.setState(this.state.products);
    })
  };
  render() {

    return (
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
        <div className="row">
          <div className="col-md-12">
            <div className='row'>
              <div className="col-md-8">
                <TableData onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText} />
              </div>
              <div className="col-md-4">
                <AddUpdateForm add={this.handleAddEvent.bind(this)} update={this.handleProductTable.bind(this)} message={this.state.successMsg} />
              </div>
              <div>
              </div>
            </div>
            <MapShowing mapsShow={this.state.products} />
          </div>
        </div>
      </div>
    );

  }
}

// class Form extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       name: '',
//       location: '',
//       url: '',
//       updateId: '',
//       updateName: '',
//       updateLocation: '',
//       updateSuccessfully: ''
//     }
//   }
//   addName = (e) => {
//     console.log(e.target.value)
//     this.setState({
//       name: e.target.value,
//     })
//   }

//   addLocation = (e) => {
//     console.log(e.target.value)
//     this.setState({
//       location: e.target.value,
//     })
//   }

//   addUrl = (e) => {
//     console.log(e.target.value)
//     this.setState({
//       url: e.target.value,
//     })

//   }

//   addData = (e) => {
//     e.preventDefault();
//     // console.log(this.state)
//     let dataAdd = {
//       name: this.state.name,
//       location: this.state.location,
//       url: this.state.url,
//     }
//     this.props.add(dataAdd)

//   }

//   updateId = (e) => {
//     this.setState({
//       updateId: e.target.value
//     })
//   }

//   updateName = (e) => {
//     this.setState({
//       updateName: e.target.value
//     })
//   }

//   updateLocation = (e) => {
//     this.setState({
//       updateLocation: e.target.value
//     })
//   }

//   updateButton = (e) => {
//     e.preventDefault();
//     let updateData = {
//       id: this.state.updateId,
//       name: this.state.updateName ? this.state.updateName : this.state.name,
//       location: this.state.updateLocation ? this.state.updateLocation : this.state.location
//     }
//     this.props.update(updateData)
//     this.setState({
//       name: '',
//       location: '',
//       url: ''
//     })
//   }

//   render() {
//     return (
//       <div className="p-3 mb-2 bg-primary text-white">
//         <div className="form-group " >
//           <div className="border border-dark col-md-9" >
//             <h2>{this.props.message}</h2>
//             <h2>Add a Location</h2>
//             <div>
//               <label>Area Name</label>
//               <input type="text" className="mb-2" onChange={this.addName} />
//             </div>
//             <div>
//               <label>Location</label>
//               <input type="text" className="mb-2" onChange={this.addLocation} />
//             </div>
//             <div>
//               <label>Url</label>
//               <input type="text" className="mb-2" onChange={this.addUrl} />
//             </div>
//             <div>
//               <button onClick={this.addData} className="btn btn-dark mb-2">Add</button>
//             </div>
//           </div>
//         </div>
//         <div className="form-group " >
//           <div className="border border-danger col-md-9" >
//             {/* <h3>Updated Successfully</h3> */}
//             <h2>Update Form</h2>
//             <div>
//               <label>Enter id</label>
//               <input type="text" onChange={this.updateId} name="text" />
//             </div>
//             <div>
//               <label>Enter name</label>
//               <input type="text" onChange={this.updateName} name="text" />
//             </div>
//             <div>
//               <label>Enter location</label>
//               <input type="text" onChange={this.updateLocation} name="text" className="mb-2" />
//             </div>
//             <div>
//               <button onClick={this.updateButton} className="btn btn-danger mb-2">Update</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// class SearchBar extends React.Component {
//   handleChange(e) {
//     this.props.onUserInput(e.target.value);
//   }
//   render() {
//     return (
//       <div>

//         <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)} />


//       </div>

//     );
//   }

// }

// class TableData extends React.Component {

//   render() {
//     var onProductTableUpdate = this.props.onProductTableUpdate;
//     var rowDel = this.props.onRowDel;
//     var filterText = this.props.filterText;
//     var product = this.props.products.map(function (product) {
//       if (product.name.toLowerCase().indexOf(filterText) === -1) {
//         return;
//       }
//       return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id} />)
//     });
//     return (
//       <div>

//         <table className="table table-bordered p-3 mb-2 bg-dark text-white">
//           <thead>
//             <tr>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Location</th>
//               <th>Url</th>
//               <th>Delete</th>
//             </tr>
//           </thead>

//           <tbody>
//             {product}

//           </tbody>

//         </table>
//       </div>
//     );

//   }

// }

// class ProductRow extends React.Component {
//   onDelEvent() {
//     this.props.onDelEvent(this.props.product);
//   }

//   onProductTableUpdate() {
//     this.props.onProductTableUpdate(this.props.product)
//   }
//   render() {

//     return (
//       <tr key={this.props.product.id}>
//         <td>{this.props.product.id}</td>
//         <td>{this.props.product.name}</td>
//         <td>{this.props.product.location}</td>
//         <td>{this.props.product.url}</td>
//         <td> <input type="button" onClick={this.onDelEvent.bind(this)} value="Delete" /></td>
//       </tr>
//     );

//   }

// }

export default Products;