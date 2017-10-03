import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getAuthUrl, login, logoutSession } from "adapters";
import { addAuthToken, logout } from "actions";
import CreateForm from "components/CreateForm";

import {
  Avatar,
  Button,
  NavBar,
  NavItem,
  NavItemGroup,
  OutlineIcon,
  Subheading
} from "styled";

class Navigation extends Component {
  state = { showOverlay: false };

  componentDidMount() {
    const { dispatch, auth } = this.props;

    if (!window.sessionStorage) {
      return;
    }

    if (!auth.toJS().isAuthenticated) {
      login().then(
        token => {
          if (!token) {
            this.props.router.push("/");
            return;
          }
          dispatch(addAuthToken(token));
        },
        err => console.log(err)
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
        <Button href={getAuthUrl()}>Sign in</Button>
      </NavItem>
    );
    const userInfo = this.props.auth.toJS().userInfo;
    const firstInitial = userInfo ? userInfo.name.given_name[0] : "I";

    const loggedInNav = (
      <NavItemGroup right>
        <NavItem>
          <Button onClick={this.handleClick} stacked>
            <OutlineIcon name="add" />
            <Subheading mt={6} capitalize micro>Add Project</Subheading>
          </Button>
        </NavItem>
        <NavItem>
          <Button icon="notification" iconSize={32} noBorder />
          <Avatar
            initial={firstInitial}
            mr={16}
            onClick={this.logout.bind(this)}
          />
        </NavItem>
      </NavItemGroup>
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
      <NavBar>
        <Button icon="logo" to="/dashboard" noBorder noHover />
        {this.props.auth.toJS().isAuthenticated ? loggedInNav : login}
        {projectForm}
      </NavBar>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(withRouter(Navigation));
