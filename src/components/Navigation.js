import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { getAuthUrl, login, logoutSession } from 'adapters';
import { addAuthToken, logout } from 'actions';

import { Button, Icon } from 'components/baseline';

class Navigation extends Component {
  componentDidMount() {
    const { dispatch, auth } = this.props;

    if (!window.sessionStorage) {
      return;
    }

    if (!auth.toJS().isAuthenticated) {
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
    const userInfo = this.props.auth.toJS().userInfo;
    const firstInitial = userInfo ? userInfo.name.given_name[0] : "I";
    const lastInitial = userInfo ? userInfo.name.surname[0] : "C";

    const loggedInNav = (
      <nav className="NavigationItems">
        <Button to="/dashboard" link>Projects</Button>
        {/* <Button to="/activity" link>Activity</Button> */}
        <Button icon="notification" noPadding />
        <Button user onClick={this.logout.bind(this)}>
          <span className="userInitials">
            {firstInitial + lastInitial}
          </span>
        </Button>
      </nav>
    );
    return (
      <div className="Navigation">
        <Link to="/">
          <Icon name='logo' width={48} height={48} />
        </Link>
        {(this.props.auth.toJS().isAuthenticated ? loggedInNav : login)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(withRouter(Navigation));
