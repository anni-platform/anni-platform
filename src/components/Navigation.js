import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { getAuthUrl, login, logoutSession } from 'adapters';
import { addAuthToken, logout } from 'actions';

import { Button, Icon } from 'components/baseline';

class Navigation extends Component {
  componentDidMount() {
    const { dispatch, isAuthenticated } = this.props;
    if (!window.sessionStorage) {
      return;
    }
    if (!isAuthenticated) {
      login().then(token => {
        if (!token) {
          this.props.router.push("/");
          return;
        }
        dispatch(addAuthToken(token));
      }, (err) => console.log(err) );
    }
  }
  logout() {
    logoutSession();
    this.props.dispatch(logout());
    this.props.router.push("/");
  }
  render() {
    const login = (
      <nav className="NavigationItems">
        <a href={getAuthUrl()}>Login</a>
        <button className='secondary'><a href={getAuthUrl()}>Sign up</a></button>
      </nav>);
    const loggedInNav = (
      <nav className="NavigationItems">
        <Button to="/dashboard" nav>Projects</Button>
        <Button to="/activity" nav>Activity</Button>
        <Button icon="notification" full/>
        <Button onClick={this.logout.bind(this)} icon="plus" />
      </nav>
    );
    return (
      <div className="Navigation">
        <Link to="/"><Icon name='logo' width={60} height={60} /></Link>
        {(this.props.auth.isAuthenticated ? loggedInNav : login)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(withRouter(Navigation));
