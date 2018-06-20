import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { getAccountInfo } from 'adapters';
import { addUserInfo } from 'actions';

export default function AuthManager(Component) {
  class Manager extends Component {
    componentDidMount() {
      getAccountInfo()
        .then(info => this.props.dispatch(addUserInfo(info)))
        .catch(() => {
          navigate('/');
        });
    }
    validateAuthentication() {
      if (!this.props.isAuthenticated) {
        this.props.router.push(`/`);
      }
    }
    render() {
      const validateAuthentication = this.validateAuthentication.bind(this);
      return <Component {...this.props} {...{ validateAuthentication }} />;
    }
  }
  return connect(({ auth }) => auth.toJS())(Manager);
}
