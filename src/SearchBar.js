import React, { Component } from 'react';

class SearchBar extends Component {
  handleChange(e) {
    this.props.onUserInput(e.target.value);
  }
  render() {
    return (
      <div>

        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)} />
      </div>

    );
  }

}

export default SearchBar;