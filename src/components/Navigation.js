import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { getAuthUrl, login, logoutSession } from 'adapters';
import { addAuthToken, logout } from 'actions';
import Icon from 'components/Icon'

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
        <a href={getAuthUrl()}>Login To Dropbox</a>
      </nav>);
    const loggedInNav = (
      <nav className="NavigationItems">
        <Link to="/dashboard" className='link'>Projects</Link>
        <Link to="/activity" className='link'>Activity</Link>
        <Link to="/dashboard" className='icon'><Icon name='notification' width='32' height='32' className='svgFill'/></Link>
        <button className="profile" onClick={this.logout.bind(this)}>IC</button>
      </nav>
    );
    return (
      <div className="Navigation">
        <Link to="/"><Icon name='logo' width='50' height='50' className='svgOutline' /></Link>
        {(this.props.auth.toJS().isAuthenticated ? loggedInNav : login)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(withRouter(Navigation));
