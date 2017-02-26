import React, { Component } from 'react';
import { Link } from 'react-router';
import constants from 'constants';
import Loader from 'components/Loader';
import ProjectManager from 'containers/ProjectManager';

class ProjectList extends Component {
  componentDidMount() {
    if (!this.props.refreshProjects) {
      return;
    }
    this.props.refreshProjects();
  }
  render() {
    const { projects, auth } = this.props;
    const loading = !auth.toJS().isAuthenticated;
    const newProjectLink = <button className='circle'><Link to={`/edit/projects/${constants.project.newProject}`}>&#43;</Link></button>

    const projectItems = Object.keys(projects.toJS()).map(id => {
      const project = projects.toJS()[id];
      return(
        <li key={`linkto${project.name}`}><Link to={`/project/${project.name}`}>{project.name}</Link></li>
      );
    });

    const projectsList = (
      <ul className='projectList'>
        {projectItems}
        <li>{newProjectLink}</li>
      </ul>
    );

    const empty = (
      <div className='dashboard'>
        <div>
          <strong>No Projects..</strong>
          {newProjectLink}
        </div>
      </div>
    );

    const renderProjects = (projectItems.length ? projectsList : empty);
    return (
      <div className='dashboard'>
        <div>
          <h3>Projects</h3>
          {(loading ? <Loader show={loading} /> : renderProjects)}
        </div>
    </div>
    );
  }
}

export default ProjectManager(ProjectList);
