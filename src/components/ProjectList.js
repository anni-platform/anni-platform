import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import constants from '../constants';
import { addProject } from '../actions';
import { getFolder } from '../adapters';
import Loader from './Loader';
import filter from 'lodash.filter';

class ProjectList extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      return;
    }
    getFolder('')
      .then(({ entries }) => {
        entries.forEach((entry, i) => {
          if (!filter(this.props.projects, (p) => p.id === entry.id).length) {
            this.props.dispatch(addProject(entry));
          }
        });
        this.setState({ loading: false });
      });
  }
  render() {
    const { projects, auth } = this.props;
    const loading = !auth.isAuthenticated;
    const newProjectLink = <Link to={`/edit/projects/${constants.project.newProject}`}>Create a Project</Link>;
    const projectItems = projects.map((project) => {
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

    const renderProjects = (projects.length ? projectsList : empty);

    return (
      <div>
        <h1>Projects</h1>
        {(loading ? <Loader show={loading} /> : renderProjects)}

      </div>
    );
  }
}

ProjectList = connect((state) => state)(ProjectList);
export default ProjectList;
