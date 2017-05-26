import React, { Component } from "react";
import constants from "constants";
import Loader from "components/Loader";
import ProjectManager from "containers/ProjectManager";
import AuthManager from "containers/AuthManager";
import {
  FILE_DATABASE_DIRECTORY,
  FILE_DATABASE_HISTORY_DIRECTORY
} from "constants/file";

import { Button } from "components/baseline";

class ProjectList extends Component {
  render() {
    const { projects, auth } = this.props;
    const loading = !auth.toJS().isAuthenticated;
    const newProjectLink = (
      <Button
        full
        to={`/edit/projects/${constants.project.newProject}`}
        icon="more"
      />
    );
    const filteredProjects = projects.filter(
      p =>
        p.get("name") !== FILE_DATABASE_DIRECTORY &&
        p.get("name") !== FILE_DATABASE_HISTORY_DIRECTORY
    );
    const projectItems = filteredProjects.valueSeq().toJS().map(project => {
      return (
        <li key={`linkto${project.name}`}>
          <Button link to={`/project/${project.name}`}>
            {project.name}
          </Button>
        </li>
      );
    });

    const projectsList = (
      <div className="content">
        <h3>Projects</h3>
        <ul className="projectList">
          {projectItems}
        </ul>
        {newProjectLink}
      </div>
    );

    const empty = (
      <div className="content">
        <h1>Add a project!</h1>
        <p>Click the + button below to get started!</p>
        {newProjectLink}
      </div>
    );

    const renderProjects = projectItems.length ? projectsList : empty;
    return (
      <div className="Dashboard">
        {loading ? <Loader show={loading} /> : renderProjects}
      </div>
    );
  }
}

export default ProjectManager(AuthManager(ProjectList));
