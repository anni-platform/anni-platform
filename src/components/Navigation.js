import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { getAuthUrl } from 'adapters';
import { login, logoutSession } from 'adapters';
import { addAuthToken, logout } from 'actions';
import Icon from 'components/Icon'

class Navigation extends Component {
  componentDidMount() {
    const { dispatch, isAuthenticated } = this.props;
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
      <div>
        <a href={getAuthUrl()}>Login To Dropbox</a>
      </div>
    );
    const loggedInNav = (
      <nav className='navigation'>
        <Link to="/dashboard"><Icon name='logo' width='50' height='50' className='svgOutline'/></Link>
        <Link to="/dashboard" className='link'>Projects</Link>
        <Link to="/activity" className='link'>Activity</Link>
        <Link to="/dashboard" className='icon'><Icon name='notification' width='32' height='32' className='svgFill'/></Link>
        <button className="profile" onClick={this.logout.bind(this)}>IC</button>
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
