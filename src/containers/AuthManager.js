import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export default function AuthManager(Component) {
  class Manager extends Component {
    validateAuthentication() {
      if (!this.props.isAuthenticated) {
        this.props.router.push(`/`);
      }
    }
    render() {
      const validateAuthentication = this.validateAuthentication.bind(this);
      return <Component {...this.props} {...{validateAuthentication}} />;
    }
  }
  return connect(({ auth }) => auth)(withRouter(Manager));
}
