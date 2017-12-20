import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getAuthUrl } from "adapters";
import {
  Button,
  Content,
  CoverImage,
  Container,
  Heading,
  Header,
  Paragraph,
  Section
} from "styled";
import Typed from "components/Typed";

import screenLG from "media/dashboard.png";
import screenMD from "media/dashboard-md.png";
import screenSM from "media/dashboard-sm.png";

class Login extends Component {
  componentDidMount() {
    if (this.props.auth.toJS().isAuthenticated) {
      this.props.router.push("/dashboard");
    }
  }

  render() {
    return (
      <Section split>
        <Header>
          <Button icon="logo" to="/dashboard" noBorder noHover />
        </Header>
        <Container split={60} center>
          <Content>
            <Heading mb={16}>
              Finally, a single space for
              {" "}
              <Typed data="hello" />
              {" "}
              to manage and present their entire workflow.
            </Heading>
            <Paragraph responsive>
              Write a script, create a moodboard, annotate your storyboards, showcase your styleframes and collaborate with your client in a single space.
              <br />
              <br />
              <Button href={getAuthUrl()}>Sign In</Button>
            </Paragraph>
          </Content>
        </Container>
        <Container split={40} center media>
          <CoverImage src={screenLG} alt="dashboard" desktop />
          <CoverImage src={screenMD} alt="dashboard" tablet />
          <CoverImage src={screenSM} alt="dashboard" mobile />
        </Container>
      </Section>
    );
  }
}
export default connect(state => state)(withRouter(Login));
