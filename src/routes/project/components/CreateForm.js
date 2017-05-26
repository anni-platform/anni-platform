import React, { Component } from "react";
import { createFolder } from "adapters";
import { addProject } from "actions";
import { Button } from "components/baseline";

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
  render() {
    const { validationMessage } = this.state;
    return (
      <div className="ProjectForm">
        <form onSubmit={this.submit} className="addProject">
          <h3>Add New Project</h3>
          <div className="Form">
            <input
              placeholder="Enter You Project Name"
              autoFocus={true}
              onChange={({ target }) => this.setState({ name: target.value })}
              className="large"
            />
            <input
              placeholder="Enter your client name"
              onChange={({ target }) => this.setState({ client: target.value })}
              className="large"
            />
          </div>
          {validationMessage
            ? <p className="ValidationErrorMessage">{validationMessage}</p>
            : null}
          <Button icon="plus">Add Project</Button>
        </form>
      </div>
    );
  }
}
