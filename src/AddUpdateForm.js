import React, { Component } from 'react';

class AddUpdateForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      url: '',
      updateId: '',
      updateName: '',
      updateLocation: '',
      updateSuccessfully: ''
    }
  }
  addName = (e) => {
    console.log(e.target.value)
    this.setState({
      name: e.target.value,
    })
  }

  addLocation = (e) => {
    console.log(e.target.value)
    this.setState({
      location: e.target.value,
    })
  }

  addUrl = (e) => {
    console.log(e.target.value)
    this.setState({
      url: e.target.value,
    })

  }

  addData = (e) => {
    e.preventDefault();
    // console.log(this.state)
    let dataAdd = {
      name: this.state.name,
      location: this.state.location,
      url: this.state.url,
    }
    this.props.add(dataAdd)

  }

  updateId = (e) => {
    this.setState({
      updateId: e.target.value
    })
  }

  updateName = (e) => {
    this.setState({
      updateName: e.target.value
    })
  }

  updateLocation = (e) => {
    this.setState({
      updateLocation: e.target.value
    })
  }

  updateButton = (e) => {
    e.preventDefault();
    let updateData = {
      id: this.state.updateId,
      name: this.state.updateName ? this.state.updateName : this.state.name,
      location: this.state.updateLocation ? this.state.updateLocation : this.state.location
    }
    this.props.update(updateData)
    this.setState({
      name: '',
      location: '',
      url: ''
    })
  }

  render() {
    return (
      <div className="p-3 mb-2 bg-primary text-white">
        <div className="form-group " >
          <div className="border border-dark col-md-9" >
            {/* <h2>{this.props.message}</h2> */}
            <h2>Add a Location</h2>
            <div>
              <label>Area Name</label>
              <input type="text" className="mb-2" onChange={this.addName} />
            </div>
            <div>
              <label>Location</label>
              <input type="text" className="mb-2" onChange={this.addLocation} />
            </div>
            <div>
              <label>Url</label>
              <input type="text" className="mb-2" onChange={this.addUrl} />
            </div>
            <div>
              <button onClick={this.addData} className="btn btn-dark mb-2">Add</button>
            </div>
          </div>
        </div>
        <div className="form-group " >
          <div className="border border-danger col-md-9" >
            {/* <h3>Updated Successfully</h3> */}
            <h2>Update Form</h2>
            <div>
              <label>Enter id</label>
              <input type="text" onChange={this.updateId} name="text" />
            </div>
            <div>
              <label>Enter name</label>
              <input type="text" onChange={this.updateName} name="text" />
            </div>
            <div>
              <label>Enter location</label>
              <input type="text" onChange={this.updateLocation} name="text" className="mb-2" />
            </div>
            <div>
              <button onClick={this.updateButton} className="btn btn-danger mb-2">Update</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddUpdateForm;