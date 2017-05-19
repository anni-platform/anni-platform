import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AuthManager from 'containers/AuthManager';

class Auth extends Component {
  componentDidMount() {
    this.props.router.push('/dashboard');
  }
  render() {
    return (
      <div>
        Awesome!
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(withRouter(AuthManager(Auth)));
