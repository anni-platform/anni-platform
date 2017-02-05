import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.router.push("dashboard");
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

export default connect((state) => state)(withRouter(Landing));
