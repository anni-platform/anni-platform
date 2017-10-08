import React, { Component } from "react";

import {
  Alert,
  AlertControls,
  AlertMessage,
  Backdrop,
  Button,
  ButtonGroup,
  Card,
  Dialog,
  Heading,
  Overlay,
  Paragraph,
  Subheading
} from "styled";

export default class Alerts extends Component {
  state = {
    isDefault: false,
    isDanger: false,
    isModal: false
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

  showModal = () => {
    this.setState({
      isModal: !this.state.isModal
    });
  };

  closeOverlay = () => {
    this.setState({
      isDefault: false,
      isDanger: false,
      isModal: false
    });
  };

  render() {
    const { isDefault, isDanger, isModal } = this.state;

    return (
      <Card padded mb={24}>
        <Subheading mb={24}>Overlays</Subheading>
        <Subheading capitalize color micro mb={16}>Alerts</Subheading>
        <ButtonGroup>
          <Button onClick={this.showDefault}>Show Regular Alert</Button>
          <Button onClick={this.showDanger}>Show Danger Alert</Button>
        </ButtonGroup>

        <Subheading capitalize color micro mb={16} mt={24}>Modal</Subheading>
        <ButtonGroup>
          <Button onClick={this.showModal}>Show Modal</Button>
        </ButtonGroup>

        {isModal &&
          <Overlay>
            <Backdrop onClick={this.closeOverlay} />
            <Dialog>
              <Heading mb={48}>Apples Butter Charlie Duff Harry.</Heading>
              <ButtonGroup center>
                <Button icon="cancel" onClick={this.closeOverlay}>
                  Dismiss
                </Button>
              </ButtonGroup>
            </Dialog>
          </Overlay>}

        {isDefault &&
          <Alert>
            <AlertMessage>
              <Subheading>Success!</Subheading>
              <Paragraph>
                Apples Butter Charlie Duff Edward Freddy George Harry.
              </Paragraph>
            </AlertMessage>
            <AlertControls>
              <Button icon="cancel" link onClick={this.closeOverlay}>
                Dismiss
              </Button>
            </AlertControls>
          </Alert>}

        {isDanger &&
          <Alert danger>
            <AlertMessage>
              <Subheading>Oh Oh..</Subheading>
              <Paragraph>
                Apples Butter Charlie Duff Edward Freddy George Harry.
              </Paragraph>
            </AlertMessage>
            <AlertControls>
              <Button icon="cancel" link onClick={this.closeOverlay}>
                Dismiss
              </Button>
            </AlertControls>
          </Alert>}
      </Card>
    );
  }
}
