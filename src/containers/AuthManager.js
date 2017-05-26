import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAccountInfo } from 'adapters';
import { addUserInfo } from 'actions';

export default function AuthManager(Component) {
  class Manager extends Component {
    componentDidMount() {
        getAccountInfo().then(info => this.props.dispatch(addUserInfo(info)))
        .catch(() => {
            this.props.router.push('/');
        });
    }
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
  return connect(({ auth }) => auth.toJS())(withRouter(Manager));
}
