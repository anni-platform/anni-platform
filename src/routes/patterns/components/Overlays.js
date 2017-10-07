import React, { Component } from "react";

import {
  Alert,
  AlertControls,
  AlertMessage,
  Button,
  ButtonGroup,
  Card,
  Paragraph,
  Subheading
} from "styled";

export default class Alerts extends Component {
  state = {
    isDefault: false,
    isDanger: false
  };

  showDefault = () => {
    this.setState({
      isDefault: !this.state.isDefault,
      isDanger: false
    });
  };

  showDanger = () => {
    this.setState({
      isDanger: !this.state.isDanger,
      isDefault: false
    });
  };

  closeAlert = () => {
    this.setState({
      isDefault: false,
      isDanger: false
    });
  };

  render() {
    const { isDefault, isDanger } = this.state;

    return (
      <Card padded mb={24}>
        <Subheading mb={24}>Overlays</Subheading>
        <Subheading capitalize color micro mb={24}>Alerts</Subheading>
        <ButtonGroup>
          <Button onClick={this.showDefault}>Regular Alert</Button>
          <Button onClick={this.showDanger}>Danger Alert</Button>
        </ButtonGroup>

        {isDefault &&
          <Alert>
            <AlertMessage>
              <Subheading>Success!</Subheading>
              <Paragraph>
                Apples Butter Charlie Duff Edward Freddy George Harry
              </Paragraph>
            </AlertMessage>
            <AlertControls>
              <Button icon="cancel" link onClick={this.closeAlert}>Dismiss</Button>
            </AlertControls>
          </Alert>}

        {isDanger &&
          <Alert danger>
            <AlertMessage>
              <Subheading>Oh Oh..</Subheading>
              <Paragraph>
                Apples Butter Charlie Duff Edward Freddy George Harry
              </Paragraph>
            </AlertMessage>
            <AlertControls>
              <Button icon="cancel" link onClick={this.closeAlert}>Dismiss</Button>
            </AlertControls>
          </Alert>}
      </Card>
    );
  }
}
