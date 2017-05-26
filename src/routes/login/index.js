import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Login extends Component {
  componentDidMount() {
    if (this.props.auth.toJS().isAuthenticated) {
      this.props.router.push("/dashboard");
    }
  }
  render() {
    return (
      <div className='Login'>
        <h1>Start your first project</h1>
        <p>Sign up using Dropbox and start using Anni to track your project's progress!</p>
      </div>
    );
  }
}

export default connect((state) => state)(withRouter(Login));
