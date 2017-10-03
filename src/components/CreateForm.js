import React, { Component } from "react";
import { createFolder } from "adapters";
import { addProject } from "actions";
import {
  Button,
  Backdrop,
  Dialog,
  Heading,
  FormGroup,
  Input,
  Overlay,
  Paragraph
} from "styled";

export default class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      client: "",
      validationMessage: ""
    };
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { name } = this.state;
    this.setState({ validationMessage: "" });
    if (!this.validateForm()) {
      this.setState({
        validationMessage: `Sorry, "${name}" is already in use`
      });
      return;
    }
    createFolder(`/${this.state.name}`)
      .then(project => {
        const { path_display } = project;
        this.props.dispatch(addProject(project));
        this.props.router.push(`/project${path_display}`);
      })
      .catch(err => console.log(err));
  }
  validateForm() {
    if (this.props.getProjectByName(this.state.name)) {
      return false;
    }
    return true;
  }

  // Check for updates from parent component via props
  componentWillReceiveProps(nextProps) {
    const { show } = this.state;

    if (nextProps.show !== show) {
      this.setState({ show: nextProps.show });
    }
  }

  // Mount and dismount the Event Listener for keyboard events
  componentWillMount() {
    window.addEventListener("keyup", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyDown);
  }

  closeViewer = () => {
    this.setState({ show: false }, this.props.onClose);
  };

  handleKeyDown = e => {
    e.preventDefault();
    // TODO these should be keycodes
    // or at least use constants
    switch (e.key) {
      case "Escape":
        this.closeViewer();
        break;

      default:
        break;
    }
  };

  render() {
    const { validationMessage } = this.state;
    const { show } = this.props;

    if (show) {
      return (
        <Overlay showNav>
          <Backdrop onClick={this.closeViewer} />
          <Dialog>
            <FormGroup onSubmit={this.submit} stacked>
              <Heading mb={12}>Add New Project</Heading>
              <Input
                placeholder="Enter You Project Name"
                autoFocus={true}
                onChange={({ target }) => this.setState({ name: target.value })}
                mb={12}
              />
              <Input
                placeholder="Enter your client name"
                onChange={({ target }) =>
                  this.setState({ client: target.value })}
                mb={24}
              />
              {validationMessage
                ? <Paragraph className="ValidationErrorMessage">
                    {validationMessage}
                  </Paragraph>
                : null}
              <Button>Add Project</Button>
            </FormGroup>
          </Dialog>
        </Overlay>
      );
    } else {
      return null;
    }
  }
}
