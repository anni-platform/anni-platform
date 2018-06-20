import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthManager from 'containers/AuthManager';
import { navigate } from '@reach/router';

class Auth extends Component {
  componentDidMount() {
    navigate('dashboard');
  }
  render() {
    return <div>Awesome!</div>;
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(AuthManager(Auth));
