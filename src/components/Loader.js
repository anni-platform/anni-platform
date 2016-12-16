import React, { Component } from 'react';
import 'styles/modules/loader';

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
