import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { getAuthUrl } from '../adapters';
import { login, logoutSession } from '../adapters';
import { addAuthToken, logout } from '../actions';

class Navigation extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    login().then(token => {
      if (!token) {
        this.props.router.push("/");
        return;
      }
      dispatch(addAuthToken(token));
      this.props.router.push("/dashboard");
    }, (err) => console.log(err) );
  }
  logout() {
    logoutSession();
    this.props.dispatch(logout());
    this.props.router.push("/");
  }
  render() {
    const login = (
      <div>
        <a href={getAuthUrl()}>Login To Dropbox</a>
      </div>
    );
    const loggedInNav = (
      <nav>
        <Link to="/">Dashboard</Link>
        <button className="buttonLink" onClick={this.logout.bind(this)}>Logout</button>
      </nav>
    )
    return (
      <div className="Navigation">
        {(this.props.auth.isAuthenticated ? loggedInNav : login)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(withRouter(Navigation));