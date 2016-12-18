import React, { Component } from 'react';

export default class extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return(
      <p>loading...</p>
    );
  }
}
