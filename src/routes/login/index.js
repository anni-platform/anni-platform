import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getAuthUrl } from "adapters";
import { CoverImage } from 'components/Image';
import {
  Button,
  Content,
  Container,
  Heading,
  Header,
  Paragraph,
  Section
} from "styled";
import Typed from "components/Typed";
import { breakpointSizes } from "constants/index";

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
          <Button icon="logo" to="/" noBorder noHover />
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
            <Paragraph responsive strong>
              Write a script, create a moodboard, annotate your storyboards, showcase your styleframes, present your video and collaborate with your client in a single space.
              <br />
              <br />
              <Button href={getAuthUrl()}>Sign In</Button>
            </Paragraph>
          </Content>
        </Container>
        <Container split={40} center media>
          <CoverImage 
            images={{
              [breakpointSizes.md]: screenLG,
              [breakpointSizes.sm]: screenMD,
              0: screenSM,
            }}
          />
        </Container>
      </Section>
    );
  }
}
export default connect(state => state)(withRouter(Login));
