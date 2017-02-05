import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAccessTokenFromUrl, storeSessionToken } from 'adapters';
import { addAuthToken } from 'actions';

class Auth extends Component {
  componentDidMount() {
    const token = getAccessTokenFromUrl();
    storeSessionToken(token);
    this.props.dispatch(addAuthToken(token));
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

export default connect(mapStateToProps)(withRouter(Auth));
