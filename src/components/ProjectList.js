import React, { Component } from 'react';
import { Link } from 'react-router';
import constants from '../constants';
import Loader from './Loader';
import ProjectManager from '../containers/ProjectManager';

class ProjectList extends Component {
  componentWillReceiveProps() {
    if (!this.props.refreshProjects) {
      return;
    }
    this.props.refreshProjects();
  }
  render() {
    const { projects, auth } = this.props;
    const loading = !auth.isAuthenticated;
    const newProjectLink = <Link to={`/edit/projects/${constants.project.newProject}`}>Create a Project</Link>;
    const projectItems = Object.keys(projects).map(id => {
      const project = projects[id];
      return(
        <li key={`linkto${project.name}`}><Link to={`/project/${project.name}`}>{project.name}</Link></li>
      );
    });

    const projectsList = (
      <ul>
        {projectItems}
        <li>{newProjectLink}</li>
      </ul>
    );

    const empty = (
      <div>
        <strong>No Projects..</strong>
        {newProjectLink}
      </div>
    );

    const renderProjects = (projectItems.length ? projectsList : empty);

    return (
      <div>
        <h1>Projects</h1>
        {(loading ? <Loader show={loading} /> : renderProjects)}

      </div>
    );
  }
}

export default ProjectManager(ProjectList);
