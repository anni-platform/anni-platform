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
      <div>
        Hey, login to dropbox above.
      </div>
    );
  }
}

export default connect((state) => state)(withRouter(Login));
