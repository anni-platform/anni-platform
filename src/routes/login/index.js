import React, { Component } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { CoverImage } from "components/Image";
import {
  Button,
  Content,
  Container,
  FieldGroup,
  Heading,
  Header,
  Input,
  Paragraph,
  Section,
} from "styled";
import Typed from "components/Typed";
import { breakpointSizes } from "constants/index";

import screenLG from "media/dashboard.png";
import screenMD from "media/dashboard-md.png";
import screenSM from "media/dashboard-sm.png";

/*
  Custom Signup Form
*/
class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      errorName: false,
      errorEmail: false,
      errorMessage: "* Both fields are required.",
    };
  }

  submit = () => {
    const { name, email } = this.state;

    if (email.length === 0 && name.length === 0) {
      this.setState({
        errorName: true,
        errorEmail: true,
        errorMessage: "Please enter a valid name and email.",
      });
    } else if (name.length === 0) {
      this.setState({
        errorName: true,
        errorMessage: "Please enter a valid name.",
      });
    } else if (email !== undefined && email.indexOf("@") > -1) {
      this.props.onValidated({
        EMAIL: email,
        NAME: name,
      });
    } else {
      this.setState({
        errorEmail: true,
        errorMessage: "Please enter a valid email address.",
      });
    }
  };

  updateName = e => {
    this.setState({
      name: e.target.value,
      errorName: false,
    });
  };

  updateEmail = e => {
    this.setState({
      email: e.target.value,
      errorEmail: false,
    });
  };

  render() {
    const { status } = this.props;
    const { errorName, errorEmail, errorMessage, email, name } = this.state;
    return (
      <Content full>
        <FieldGroup mt={24}>
          <Input
            danger={errorName}
            type="text"
            placeholder="Your name"
            onChange={this.updateName}
            value={name}
            mr={16}
            mb={16}
          />

          <Input
            danger={errorEmail}
            onChange={this.updateEmail}
            type="email"
            placeholder="Your email"
            value={email}
            mr={16}
            mb={16}
          />
          <Button onClick={this.submit} disabled={status}>Submit</Button>
        </FieldGroup>
        <Paragraph tiny danger={errorName || errorEmail} mt={8}>
          {status === "error"
            ? "An error occured please try again later."
            : errorMessage}
        </Paragraph>
      </Content>
    );
  }
}

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
              Finally, a single space for <Typed data="hello" /> to manage and
              present their work.
            </Heading>
            <Paragraph responsive>
              Write a script, create a moodboard, annotate your storyboards,
              showcase your styleframes, present your video and collaborate with
              your client in a single space.
            </Paragraph>
            <Paragraph responsive mt={32}>
              We haven't launched yet, but we will be admitting users into the
              Beta Program soon. Sign up below to join!
            </Paragraph>
            <MailchimpSubscribe
              url="https://anni.us16.list-manage.com/subscribe/post?u=69e025bd975c0ddc0239262d1&amp;id=7059a598b1"
              render={({ subscribe, status, message }) => (
                <SignupForm
                  status={status}
                  message={message}
                  onValidated={formData => subscribe(formData)}
                />
              )}
            />
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
