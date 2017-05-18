import React, { Component } from 'react';
import constants from 'constants';
import Loader from 'components/Loader';
import ProjectManager from 'containers/ProjectManager';

import { Button } from 'components/baseline';

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
    const newProjectLink =
      <Button
        full
        to={`/edit/projects/${constants.project.newProject}`}
        icon="more">
      </Button>

    const projectItems = Object.keys(projects).map(id => {
      const project = projects[id];
      return(
        <li key={`linkto${project.name}`}>
          <Button link to={`/project/${project.name}`}>
            {project.name}
          </Button>
        </li>
      );
    });

    const projectsList = (
      <div className='content'>
        <h3>Projects</h3>
        <ul className='projectList'>
          {projectItems}
        </ul>
        {newProjectLink}
      </div>
    );

    const empty = (
      <div className='content'>
        <h1>Add a project!</h1>
        <p>Click the + button below to get started!</p>
        {newProjectLink}
      </div>
    );

    const renderProjects = (projectItems.length ? projectsList : empty);
    return (
      <div className='Dashboard'>
        <div className='background' />
        {(loading ? <Loader show={loading} /> : renderProjects)}
    </div>
    );
  }
}

export default ProjectManager(ProjectList);
