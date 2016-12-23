import React, { Component } from 'react';
import { withRouter } from 'react-router';
import constants from 'constants';
import { createFolder, removeFolder } from 'adapters';
import ProjectManager from 'containers/ProjectManager';
import { addProject, removeProject } from 'actions';
import Headline from './components/Headline'
import Script from './components/Script'
import Moodboard from './components/Moodboard';


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
    this.props.refreshProjects();
  }
  render() {
    const { id } = this.props.params;
    const project = this.props.getProjectByName(id);
    return (
      <div className='ProjectDetail'>
        <Headline name={project.name} />
        <Script />
        <Moodboard projectPath={id} project={project} />
        <div>
          <button
            className='secondary'
            onClick={() => {
            removeFolder(project.path_display).then(() => {
              this.props.dispatch(removeProject(project.id, id));
              this.props.refreshProjects();
              this.props.router.push("/dashboard");
            })
          }}>Delete Project</button>
        </div>
      </div>
    );
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
