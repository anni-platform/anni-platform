import React, { Component } from 'react';
import constants from '../constants';
import { createFolder } from '../adapters';
import { withRouter } from 'react-router';

class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    console.log(this.props);
    createFolder(`/${this.state.name}`)
      .then(({ path_display }) => {
        this.props.router.push(`/project${path_display}`);
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <form onSubmit={this.submit}>
        <input onChange={({ target }) => this.setState({ name: target.value })}/>
        <button>Create</button>
      </form>
    )
  }
}

const ConnectedProjectForm = withRouter(ProjectForm);


export default class Project extends Component {
  render() {
    console.log(this.context.router);
    const { action } = this.props.params;
    switch(action) {
      case constants.project.newProject:
        return <ConnectedProjectForm {...this.props} />
      default:
        return null;
    }
  }
}
