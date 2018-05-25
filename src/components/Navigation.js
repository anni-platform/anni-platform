import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { login, logoutSession, getAccountInfo, getAuthUrl } from "adapters";
import { addAuthToken, logout, addUserInfo } from "actions";
import CreateForm from "components/CreateForm";

import {
  Avatar,
  Button,
  NavBar,
  NavItem,
  NavItemGroup,
} from "styled";

class Navigation extends Component {
  state = { showOverlay: false };

  componentDidMount() {
    const { dispatch, auth } = this.props;

    window.loginAnni = () => window.location.href = getAuthUrl();

    if (!window.sessionStorage) {
      return;
    }

    // referencing window.location breaks HMR for some reason..
    // const unAuthenticatedRoutes = ['/patterns'];
    // const routeNeedsAuthentication = !unAuthenticatedRoutes.find(r => r === window.location.pathname);
    if (!auth.toJS().isAuthenticated) {
      login().then(
        token => {
          if (!token) {
            this.props.router.push("/");
            return;
          }
          dispatch(addAuthToken(token));
          getAccountInfo()
          .then(info => {
            this.props.dispatch(addUserInfo(info));
            this.props.router.push("/dashboard");
          });
        },
        err => {
          if (err) console.log(err);
        }
      );
    }
  }

  logout() {
    logoutSession();
    this.props.dispatch(logout());
    this.props.router.push("/");
  }

  handleClick = () => this.setState({ showOverlay: true });

  render() {
    const login = (
      <NavItem right>
        {/* <Button href={getAuthUrl()}>Sign in</Button> */}
      </NavItem>
    );
    const userInfo = this.props.auth.toJS().userInfo;
    const firstInitial = userInfo ? userInfo.name.given_name[0] : null;

    const loggedInNav = (
      <NavBar>
        <Button icon="logo" to="/dashboard" noBorder noHover />

      <NavItemGroup right>
        <NavItem>
          <Button icon="more" iconSize={28} onClick={this.handleClick} stacked>
            Add Project
          </Button>
        </NavItem>
        <NavItem>
          <Button icon="notification" fill iconSize={32} noBorder />
          <Avatar
            initial={firstInitial}
            mr={16}
            onClick={this.logout.bind(this)}
          />
        </NavItem>
      </NavItemGroup>
    </NavBar>
    );

    const projectForm = this.state.showOverlay
      ? <CreateForm
          show={this.state.showOverlay}
          onClose={() => {
            this.setState({
              showOverlay: false
            });
          }}
        />
      : null;
    return (
      <div>
        {this.props.auth.toJS().isAuthenticated ? loggedInNav : login}
        {projectForm}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(withRouter(Navigation));
