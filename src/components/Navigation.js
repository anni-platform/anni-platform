import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { login, logoutSession, getAccountInfo, getAuthUrl } from "adapters";
import { addAuthToken, logout, addUserInfo } from "actions";
import CreateForm from "components/CreateForm";
import FeedbackSidebar from "components/FeedbackSidebar";
import Notifications from "components/Notifications";
import * as KeyCodes from 'constants/keyCodes';
import {
  Avatar,
  Button,
  Content,
  FeedbackItem,
  NavBar,
  NavItem,
  NavItemGroup,
} from "styled";

class Navigation extends Component {
  state = {
    showNewProjectForm: false,
    showNotes: false,
    showNotifications: false,
  };

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
          getAccountInfo().then(info => {
            this.props.dispatch(addUserInfo(info));
            this.props.router.push("/dashboard");
          });
        },
        err => {
          if (err) console.log(err);
        },
      );
    }
  }

  componentWillMount() {
    window.addEventListener("keyup", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyDown);
  }

  closeViewer = () => {
    this.setState({
      showNewProjectForm: false,
      showNotes: false,
      showNotifications: false,
    });
  };

  handleKeyDown = ({ which, ctrlKey }) => {

    if (ctrlKey) {
      switch (which) {
        case KeyCodes.L:
          window.location.href = getAuthUrl();
          break;

        default:
          break;
      }
    } else {
      switch (which) {
        case KeyCodes.Escape:
          this.closeViewer();
          break;

        default:
          break;
      }
    }
  };

  handleLogout = () => {
    logoutSession();
    this.props.dispatch(logout());
    this.props.router.push("/");
  };

  handleNewProjectForm = () => this.setState({ showNewProjectForm: true });

  handleNotes = () => this.setState({ showNotes: !this.state.showNotes });

  handleNotifications = () =>
    this.setState({ showNotifications: !this.state.showNotifications });

  render() {
    const userInfo = this.props.auth.toJS().userInfo;
    const firstInitial = userInfo ? userInfo.name.given_name[0] : null;
    const { showNewProjectForm, showNotes, showNotifications } = this.state;
    /*
      We need to replace this when we switch to RR4
    */
    const currentPath = this.context.location.pathname;

    if (this.props.auth.toJS().isAuthenticated) {
      if (currentPath === "/dashboard") {
        return (
          <Content full>
            <NavBar>
              <Button icon="logo" to="/dashboard" noBorder noHover />

              <NavItemGroup right>
                <NavItem>
                  <Button
                    icon="more"
                    iconSize={24}
                    onClick={this.handleNewProjectForm}
                    stacked
                  >
                    Add Project
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    active={showNotifications}
                    icon="notification"
                    iconSize={32}
                    onClick={this.handleNotifications}
                    fill
                    noBorder
                  />
                  <Avatar
                    initial={firstInitial}
                    logOut={this.handleLogout}
                    mr={16}
                  />
                  <Notifications show={showNotifications} />
                </NavItem>
              </NavItemGroup>
            </NavBar>

            {showNewProjectForm ? (
              <CreateForm
                show={this.state.showNewProjectForm}
                onClose={() => {
                  this.setState({
                    showNewProjectForm: false,
                  });
                }}
              />
            ) : null}
          </Content>
        );
      } else {
        return (
          <NavBar>
            <Button icon="logo" to="/dashboard" noBorder noHover />
            <NavItemGroup right>
              <Button icon="play" iconSize={24} fill stacked>
                Preview
              </Button>
              <Button icon="share" iconSize={24} fill stacked>
                Share
              </Button>
              <Button
                icon="todo"
                onClick={this.handleNotes}
                iconSize={24}
                active={showNotes}
                stacked
                fill
              >
                Notes
              </Button>
            </NavItemGroup>
            <NavItem>
              <Button icon="notification" iconSize={32} fill noBorder />
              <Avatar
                initial={firstInitial}
                mr={16}
                onClick={this.handleLogout}
                logOut={this.handleLogout}
              />
            </NavItem>

            {/*
              This needs to be replaced with real content
              */}
            <FeedbackSidebar show={showNotes}>
              <FeedbackItem
                author="Ivan Cruz"
                message="Apples Butter Charlie Duff Edward Harry Ink Johnnie King London Monkey."
                time="4 min ago"
              />
              <FeedbackItem
                author="Mika Cruz"
                message="Duff Edward Freddy George Harry Ink Johnnie King Apples Butter Charlie."
                time="8 min ago"
              />
              <FeedbackItem
                author="Ivan Cruz"
                message="Apples Butter Charlie Duff Edward Harry Ink Johnnie King London Monkey."
                time="4 min ago"
              />
            </FeedbackSidebar>
          </NavBar>
        );
      }
    } else {
      return <Content full />;
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

/*
  We need to replace this when we switch to RR4
*/

Navigation.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

export default connect(mapStateToProps)(withRouter(Navigation));
