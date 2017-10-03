import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Content, Heading, Paragraph, Section } from "styled";

class Login extends Component {
  componentDidMount() {
    if (this.props.auth.toJS().isAuthenticated) {
      this.props.router.push("/dashboard");
    }
  }
  render() {
    return (
      <Section>
      <Content>
        <Heading>Start your first project</Heading>
        <Paragraph>
          Sign up using Dropbox and start using Anni to track your project's progress!
        </Paragraph>
      </Content>
    </Section>
    );
  }
}
export default connect(state => state)(withRouter(Login));
