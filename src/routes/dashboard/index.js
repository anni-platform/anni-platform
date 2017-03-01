import React, { Component } from 'react';
import { Link } from 'react-router';
import constants from 'constants';
import Loader from 'components/Loader';
import ProjectManager from 'containers/ProjectManager';

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
    const newProjectLink = <button className='circle'><Link to={`/edit/projects/${constants.project.newProject}`}>&#43;</Link></button>

    const projectItems = Object.keys(projects).map(id => {
      const project = projects[id];
      return(
        <li key={`linkto${project.name}`}><Link to={`/project/${project.name}`}>{project.name}</Link></li>
      );
    });

    const projectsList = (
      <div className='dashboard'>
        <h3>Projects</h3>
        <ul className='projectList'>
          {projectItems}
          <li>{newProjectLink}</li>
        </ul>
      </div>
    );

    const empty = (
      <div className='dashboard'>
        <h1>Add a project!</h1>
        <p>Click the button below to add your first project!</p>
        {newProjectLink}
      </div>
    );

    const renderProjects = (projectItems.length ? projectsList : empty);
    return (
      <div className='dashboard'>
        {(loading ? <Loader show={loading} /> : renderProjects)}
    </div>
    );
  }
}

export default ProjectManager(ProjectList);
