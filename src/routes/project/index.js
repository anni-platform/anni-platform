import React, { Component } from 'react';
import { withRouter } from 'react-router';
import constants from 'constants';
import { createFolder, removeFolder } from 'adapters';
import ProjectManager from 'containers/ProjectManager';
import { addProject, removeProject, deleteFile } from 'actions';
import Headline from './components/Headline'
import Script from './components/Script'
import Moodboard from './components/Moodboard';
import filter from 'lodash.filter';

class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      validationMessage: ''
    }
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { name } = this.state;
    this.setState({ validationMessage: '' });
    if (!this.validateForm()) {
      this.setState({ validationMessage: `Sorry, "${name}" is already in use` });
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
      <form onSubmit={this.submit}>
        {(validationMessage ? <p className="ValidationErrorMessage">{validationMessage}</p> : null)}
        <input autoFocus={true} onChange={({ target }) => this.setState({ name: target.value })}/>
        <button>Create</button>
      </form>
    )
  }
}

class ProjectDetail extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    const project = this.props.getProjectByName(id);
    if (!project) {
        this.props.router.push("/dashboard");
    }
  }
  render() {
    const { id } = this.props.params;
    const project = this.props.getProjectByName(id);
    if (!project) {
      return null;
    }
    return (
      <div className='ProjectDetail'>
        <Headline name={project.name} />
        <Script />
        <Moodboard projectPath={id} project={project} />
        <div>
          <button
            className='secondary'
            onClick={() => {
            removeFolder(project.path_display).then(this._removeProject.bind(this));
          }}>Delete Project</button>
        </div>
      </div>
    );
  }

  _removeProject() {
    const { id } = this.props.params;
    const project = this.props.getProjectByName(id);
    this.props.dispatch(removeProject(project.id, id));
    const collectionKeys = Object.keys(this.props.files.collections);
    // remove all unused files from store
    Object.keys(this.props.files.archive).forEach(file => {
      const fileUsed = collectionKeys.map(collection => collection.indexOf(file));
      if (!filter(fileUsed, i => i > -1).length) {
        this.props.dispatch(deleteFile(file));
      }
    });
    this.props.router.push("/dashboard");
  }
}

class Project extends Component {
  render() {
    const { action } = this.props.params;
    switch(action) {
      case constants.project.newProject:
        return <ProjectForm {...this.props} />
      default:
        return <ProjectDetail {...this.props} />;
    }
  }
}

export default ProjectManager(withRouter(Project));
