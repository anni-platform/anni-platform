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
        <Button primary href={getAuthUrl()}>Sign in</Button>
      </nav>);
    const loggedInNav = (
      <nav className="NavigationItems">
        <Button to="/dashboard" link>Projects</Button>
        <Button to="/activity" link>Activity</Button>
        <Button icon="notification" full/>
        <Button user onClick={this.logout.bind(this)} />
      </nav>
    );
    return (
      <div className="Navigation">

        <Link to="/">
          <Icon name='logo' width={48} height={48} />
        </Link>
        {(this.props.auth.isAuthenticated ? loggedInNav : login)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(withRouter(Navigation));
